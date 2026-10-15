const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const crypto = require("crypto");
const sendResetemail = require("../utils/sendEmail");

// ==========================================
// 1. STUDENT SIGNUP
// ==========================================
const signup = async (req, res) => {
    try {
        const {
            fullName,
            email,
            mobile,
            usn,
            parentMobile,
            organization,
            password,
            confirmPassword
        } = req.body;

        if (
            !fullName ||
            !email ||
            !mobile ||
            !usn ||
            !parentMobile ||
            !organization ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const emailCheck = await pool.query(
            "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
            [email.trim()]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const usnCheck = await pool.query(
            "SELECT id FROM users WHERE LOWER(usn) = LOWER($1)",
            [usn.trim()]
        );

        if (usnCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "USN already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (
                full_name,
                email,
                mobile,
                usn,
                parent_mobile,
                organization,
                password,
                role,
                status
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, 'student', 'approved')
            RETURNING 
                id,
                full_name,
                email,
                mobile,
                usn,
                organization,
                role,
                status,
                created_at`,
            [
                fullName,
                email.trim(),
                mobile,
                usn.trim(),
                parentMobile,
                organization,
                hashedPassword
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Student account created successfully",
            user: result.rows[0],
        });
    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// 2. EMPLOYER SIGNUP (Pending Admin Approval)
// ==========================================
const employerSignup = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            companyName,
            fullName,
            email,
            phone,
            website,
            industry,
            companySize,
            location,
            password,
            confirmPassword
        } = req.body;

        if (!companyName || !fullName || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required employer fields"
            });
        }

        if (confirmPassword && password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check if user email already exists
        const emailCheck = await client.query(
            "SELECT id, role, status FROM users WHERE LOWER(email) = $1",
            [normalizedEmail]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered. If pending approval, please await admin review."
            });
        }

        await client.query("BEGIN");

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users with status = 'pending'
        const userInsert = await client.query(
            `INSERT INTO users (
                full_name,
                email,
                mobile,
                organization,
                password,
                role,
                status
            ) VALUES ($1, $2, $3, $4, $5, 'employer', 'pending')
            RETURNING id, full_name, email, mobile, organization, role, status, created_at`,
            [fullName, normalizedEmail, phone, companyName, hashedPassword]
        );

        const newUser = userInsert.rows[0];

        // Insert into employers table
        const employerInsert = await client.query(
            `INSERT INTO employers (
                user_id,
                company_name,
                industry,
                company_size,
                website,
                location,
                contact_person,
                phone,
                email,
                status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
            RETURNING id, company_name, email, status, created_at`,
            [
                newUser.id,
                companyName,
                industry || "Other",
                companySize || "1-50 employees",
                website || null,
                location || "Not specified",
                fullName,
                phone,
                normalizedEmail
            ]
        );

        // Audit log
        await client.query(
            `INSERT INTO admin_audit_logs (action, target_type, target_id, details)
             VALUES ('EMPLOYER_REGISTER', 'employer', $1, $2)`,
            [
                employerInsert.rows[0].id,
                JSON.stringify({
                    company_name: companyName,
                    contact: fullName,
                    email: normalizedEmail
                })
            ]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            status: "pending",
            message: "Registration request submitted successfully! Your employer account is pending administrator approval. You can sign in once accepted.",
            employer: employerInsert.rows[0]
        });

    } catch (error) {
        await client.query("ROLLBACK");
        console.error("EMPLOYER SIGNUP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to process employer registration"
        });
    } finally {
        client.release();
    }
};

// ==========================================
// 3. INSTITUTION SIGNUP (Pending Admin Approval)
// ==========================================
const institutionSignup = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            institutionName,
            institutionType,
            adminName,
            designation,
            email,
            phone,
            website,
            password,
            confirmPassword
        } = req.body;

        if (!institutionName || !institutionType || !adminName || !designation || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required institution fields"
            });
        }

        if (confirmPassword && password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const emailCheck = await client.query(
            "SELECT id FROM users WHERE LOWER(email) = $1",
            [normalizedEmail]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered. If pending approval, please await admin review."
            });
        }

        await client.query("BEGIN");

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users with role = 'institution', status = 'pending'
        const userInsert = await client.query(
            `INSERT INTO users (
                full_name,
                email,
                mobile,
                organization,
                password,
                role,
                status
            ) VALUES ($1, $2, $3, $4, $5, 'institution', 'pending')
            RETURNING id, full_name, email, mobile, organization, role, status, created_at`,
            [adminName, normalizedEmail, phone, institutionName, hashedPassword]
        );

        const newUser = userInsert.rows[0];

        // Insert into institutions table
        const instInsert = await client.query(
            `INSERT INTO institutions (
                user_id,
                institution_name,
                institution_type,
                admin_name,
                designation,
                phone,
                email,
                website,
                status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
            RETURNING id, institution_name, email, status, created_at`,
            [
                newUser.id,
                institutionName,
                institutionType,
                adminName,
                designation,
                phone,
                normalizedEmail,
                website || null
            ]
        );

        // Audit log
        await client.query(
            `INSERT INTO admin_audit_logs (action, target_type, target_id, details)
             VALUES ('INSTITUTION_REGISTER', 'institution', $1, $2)`,
            [
                instInsert.rows[0].id,
                JSON.stringify({
                    institution_name: institutionName,
                    admin_name: adminName,
                    email: normalizedEmail
                })
            ]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            status: "pending",
            message: "Registration request submitted successfully! Your institution account is pending administrator approval. You can sign in once accepted.",
            institution: instInsert.rows[0]
        });

    } catch (error) {
        await client.query("ROLLBACK");
        console.error("INSTITUTION SIGNUP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to process institution registration"
        });
    } finally {
        client.release();
    }
};

// ==========================================
// 4. UNIFIED LOGIN (Checks Credentials & Approval Status)
// ==========================================
const login = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const inputIdentifier = (userName || email || "").trim();

        if (!inputIdentifier || !password) {
            return res.status(400).json({
                success: false,
                message: "Email / USN and password are required"
            });
        }

        // Find user by Email or USN
        const result = await pool.query(
            `SELECT * 
             FROM users 
             WHERE LOWER(email) = LOWER($1)
                OR LOWER(usn) = LOWER($1)
             LIMIT 1`,
            [inputIdentifier]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email/USN or password"
            });
        }

        const user = result.rows[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email/USN or password"
            });
        }

        // CHECK APPROVAL STATUS
        if (user.status === "pending") {
            return res.status(403).json({
                success: false,
                status: "pending",
                message: "Your registration request is currently pending administrator approval. You will be able to log in as soon as it is accepted."
            });
        }

        if (user.status === "rejected") {
            const reason = user.rejection_reason ? `: "${user.rejection_reason}"` : ".";
            return res.status(403).json({
                success: false,
                status: "rejected",
                message: `Your registration request was rejected by the administrator${reason}`
            });
        }

        if (user.status === "suspended") {
            return res.status(403).json({
                success: false,
                status: "suspended",
                message: "Your account has been temporarily suspended by the administrator. Please contact support."
            });
        }

        // Gather role-specific details
        let extraProfile = {};
        if (user.role === "employer") {
            const empRes = await pool.query("SELECT * FROM employers WHERE user_id = $1", [user.id]);
            if (empRes.rows.length > 0) {
                extraProfile = empRes.rows[0];
            }
        } else if (user.role === "institution") {
            const instRes = await pool.query("SELECT * FROM institutions WHERE user_id = $1", [user.id]);
            if (instRes.rows.length > 0) {
                extraProfile = instRes.rows[0];
            }
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                usn: user.usn,
                role: user.role,
                status: user.status
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                mobile: user.mobile,
                usn: user.usn,
                organization: user.organization,
                role: user.role,
                status: user.status,
                profile: extraProfile
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};

// ==========================================
// 5. ADMIN LOGIN (Head Portal Authentication)
// ==========================================
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Admin email and password are required"
            });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND role = 'admin' LIMIT 1",
            [email.trim()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid administrator credentials"
            });
        }

        const admin = result.rows[0];
        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid administrator credentials"
            });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                role: "admin"
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Admin login successful",
            token,
            admin: {
                id: admin.id,
                fullName: admin.full_name,
                email: admin.email,
                role: "admin"
            }
        });

    } catch (error) {
        console.error("Admin Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during admin login"
        });
    }
};

// ==========================================
// 6. CURRENT USER INFO (/api/auth/me)
// ==========================================
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            "SELECT id, full_name, email, mobile, usn, organization, role, status, created_at FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user = result.rows[0];
        let profile = {};

        if (user.role === "employer") {
            const empRes = await pool.query("SELECT * FROM employers WHERE user_id = $1", [user.id]);
            if (empRes.rows.length > 0) profile = empRes.rows[0];
        } else if (user.role === "institution") {
            const instRes = await pool.query("SELECT * FROM institutions WHERE user_id = $1", [user.id]);
            if (instRes.rows.length > 0) profile = instRes.rows[0];
        }

        return res.json({
            success: true,
            user: { ...user, profile }
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ==========================================
// 7. FORGOT & RESET PASSWORD
// ==========================================
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email or USN is required"
            });
        }

        const userName = email.trim();
        const result = await pool.query(
            `SELECT id, full_name, email
             FROM users
             WHERE LOWER(email) = LOWER($1)
                OR LOWER(usn) = LOWER($1)
             LIMIT 1`,
            [userName]
        );

        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: "If an account exists, a password reset link has been sent to the registered email."
            });
        }

        const user = result.rows[0];
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const expiry = new Date(Date.now() + 15 * 60 * 1000);

        await pool.query(
            `UPDATE users 
             SET reset_password_token = $1, reset_password_expires = $2
             WHERE id = $3`,
            [hashedToken, expiry, user.id]
        );

        const resetLink = `${process.env.FRONTEND_URL}reset-password/${resetToken}`;
        await sendResetemail(user.email, resetLink, user.full_name);

        return res.status(200).json({
            success: true,
            message: "If an account exists, a password reset link has been sent to the registered email."
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to process password reset request"
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: "Invalid reset link" });
        }

        if (!password || !confirmPassword || password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const result = await pool.query(
            `SELECT id 
             FROM users
             WHERE reset_password_token = $1
               AND reset_password_expires > NOW()
             LIMIT 1`,
            [hashedToken]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Reset link is invalid or has expired"
            });
        }

        const userId = result.rows[0].id;
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `UPDATE users
             SET password = $1, reset_password_token = NULL, reset_password_expires = NULL
             WHERE id = $2`,
            [hashedPassword, userId]
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to reset password"
        });
    }
};

module.exports = {
    signup,
    employerSignup,
    institutionSignup,
    login,
    adminLogin,
    getMe,
    forgotPassword,
    resetPassword
};