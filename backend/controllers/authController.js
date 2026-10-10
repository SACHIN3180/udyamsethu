const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const crypto = require("crypto");
const sendResetemail = require("../utils/sendEmail")

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

        //1. Validate fields

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
            })
        }

        //2 Password validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }

        // 3 Check Email
        const emailCheck = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            })
        }
        //4 Check USN 
        const usnCheck = await pool.query(
            "SELECT id FROM users WHERE usn = $1",
            [usn]
        );

        if (usnCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "USN already registered"
            })
        }

        //5 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //6 Insert User

        const result = await pool.query(
            `INSERT INTO users (
                    full_name,
                    email,
                    mobile,
                    usn,
                    parent_mobile,
                    organization,
                    password
                    ) 
                    VALUES ($1,$2,$3,$4,$5,$6,$7)
                        RETURNING 
                        id,
                        full_name,
                        email,
                        mobile,
                        usn,
                        parent_mobile,
                        organization,
                        created_at`,
            [
                fullName,
                email,
                mobile,
                usn,
                parentMobile,
                organization,
                hashedPassword
            ]
        );

        //7 Send response 
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: result.rows[0],
        })
    } catch (error) {
        console.error("=================================");
        console.error("SIGNUP ERROR:");
        console.error(error);
        console.error("=================================");

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//      ========> LOGIN <==========

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        //Check input
        if (!userName || !password) {
            return res.status(400).json({
                message: "Email/USN and password are required"
            })
        }

        //Find user by Email or USN
        const result = await pool.query(
            `
            SELECT * 
            FROM users 
            WHERE LOWER(email) = LOWER($1)
                OR LOWER(usn) = LOWER($1)
                LIMIT 1` ,
            [userName.trim()]
        );

        //User dosent exist 
        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid Email/USN or password"
            })
        }
        const user = result.rows[0];

        //Compare password 
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid Email/USN or password"
            })
        }

        console.log("JWT SECRET:", process.env.JWT_SECRET);

        //Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                usn: user.usn,
                role:user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            })

        //Login successful
        res.status(200).json({
            message: "Login successful",
            token,

            user: {
                id: user.id,
                fullName: user.full_Name,
                email: user.email,
                mobile: user.mobile,
                usn: user.usn,
                organization: user.organization


            }
        })
    }
    catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error during login"
        })
    }

}

// FORGOT PASSWORD

const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;

        //Check input   

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email or USN is required"
            })
        }

        const userName = email.trim();

        //Find user by Email or USN

        const result = await pool.query(
            `
                SELECT id, full_name, email
                FROM users
                WHERE LOWER(email) = LOWER($1)
                OR LOWER(usn) = LOWER($1)
                LIMIT 1
            `,
            [userName]
        );

        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: " If an account exists, a password reset link has been sent to the registerd email."
            })
        }

        const user = result.rows[0];

        //Generate secure random token 
        const resetToken = crypto.randomBytes(32).toString("hex");

        //Hash token before storing it in database
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const expiry = new Date(Date.now() + 15 * 60 * 1000);

        // Token experies after 15 minutes
        await pool.query(
            `
                UPDATE users 
                SET reset_password_token = $1,
                reset_password_expires = $2
                WHERE id = $3
            `,
            [
                hashedToken,
                expiry,
                user.id
            ]
        );

        //Create reset link
        const resetLink = `${process.env.FRONTEND_URL}reset-password/${resetToken}`;

        console.log("Reset Link", resetLink);

        await sendResetemail(
            user.email,
            resetLink,
            user.full_Name
        );

        //Response
        return res.status(200).json({
            success: true,
            message: "If an account exists, a password reset link  has been sent to the registered email."
        })

    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to process password reset request"
        })
    }

}

// =======>RESET PASSWORS <=========

const resetPassword = async (req, res) => {

    try {
        const { token } = req.params;

        const {
            password,
            confirmPassword
        } = req.body;

        //Check token 
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Invalid reset link"
            })
        }

        //Check Password 
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }
        //Password length 
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }

        //Hash token
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")

        //Find valid token 
        const result = await pool.query(
            `
                SELECT id 
                FROM users
                WHERE reset_password_token = $1
                    AND reset_password_expires > NOW()
                LIMIT 1
            `,
            [hashedToken]
        )

        //Invalid or expired token 
        if (result.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Reset link is invalid or has expired"
            })
        }

        const userId = result.rows[0].id;

        //Hash new password 
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        //Update password 
        //Also remove reset token so it cannot be reused
        await pool.query(
            `   
                UPDATE users
                SET password =$1,
                reset_password_token = NULL,
                reset_password_expires = NULL
                WHERE id = $2
            `, [
            hashedPassword,
            userId
        ]
        )

        //Success
        return res.status(200).json({
            success: false,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to reset password"
        })
    }
}

module.exports = {
    signup, login, forgotPassword, resetPassword
} 