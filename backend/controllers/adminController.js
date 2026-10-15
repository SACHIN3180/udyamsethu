const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// ==========================================
// 1. DASHBOARD OVERVIEW & STATS
// ==========================================
const getDashboardStats = async (req, res) => {
    try {
        const studentCountRes = await pool.query(
            "SELECT COUNT(*) FROM users WHERE role = 'student'"
        );
        const employerCountRes = await pool.query(
            "SELECT COUNT(*) FROM employers"
        );
        const institutionCountRes = await pool.query(
            "SELECT COUNT(*) FROM institutions"
        );
        const pendingEmployersRes = await pool.query(
            "SELECT COUNT(*) FROM employers WHERE status = 'pending'"
        );
        const pendingInstitutionsRes = await pool.query(
            "SELECT COUNT(*) FROM institutions WHERE status = 'pending'"
        );
        const opportunitiesCountRes = await pool.query(
            "SELECT COUNT(*) FROM opportunities WHERE status = 'active'"
        );

        const totalPending =
            parseInt(pendingEmployersRes.rows[0].count, 10) +
            parseInt(pendingInstitutionsRes.rows[0].count, 10);

        // Recent 6 Pending Requests
        const recentPendingEmp = await pool.query(
            `SELECT id, company_name AS name, contact_person, email, phone, created_at, 'employer' AS type, status 
             FROM employers 
             WHERE status = 'pending' 
             ORDER BY created_at DESC LIMIT 5`
        );

        const recentPendingInst = await pool.query(
            `SELECT id, institution_name AS name, admin_name AS contact_person, email, phone, created_at, 'institution' AS type, status 
             FROM institutions 
             WHERE status = 'pending' 
             ORDER BY created_at DESC LIMIT 5`
        );

        const combinedPending = [...recentPendingEmp.rows, ...recentPendingInst.rows]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 6);

        // Recent 5 Audit Logs
        const logsRes = await pool.query(
            `SELECT * FROM admin_audit_logs ORDER BY created_at DESC LIMIT 6`
        );

        return res.json({
            success: true,
            stats: {
                totalStudents: parseInt(studentCountRes.rows[0].count, 10),
                totalEmployers: parseInt(employerCountRes.rows[0].count, 10),
                totalInstitutions: parseInt(institutionCountRes.rows[0].count, 10),
                pendingApprovals: totalPending,
                pendingEmployers: parseInt(pendingEmployersRes.rows[0].count, 10),
                pendingInstitutions: parseInt(pendingInstitutionsRes.rows[0].count, 10),
                activeOpportunities: parseInt(opportunitiesCountRes.rows[0].count, 10),
            },
            recentPending: combinedPending,
            recentLogs: logsRes.rows
        });
    } catch (err) {
        console.error("Dashboard stats error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ==========================================
// 2. APPROVALS MANAGEMENT (Task 1 & 2 Core)
// ==========================================
const getApprovals = async (req, res) => {
    try {
        const { type, status } = req.query; // status: 'pending', 'approved', 'rejected', 'all'

        let employersQuery = `
            SELECT 
                e.id, 
                e.user_id, 
                e.company_name AS name, 
                e.industry, 
                e.company_size, 
                e.website, 
                e.location, 
                e.contact_person, 
                e.phone, 
                e.email, 
                e.status, 
                e.rejection_reason, 
                e.created_at, 
                'employer' AS request_type
            FROM employers e
        `;
        let institutionsQuery = `
            SELECT 
                i.id, 
                i.user_id, 
                i.institution_name AS name, 
                i.institution_type AS industry, 
                NULL AS company_size, 
                i.website, 
                NULL AS location, 
                i.admin_name AS contact_person, 
                i.phone, 
                i.email, 
                i.status, 
                i.rejection_reason, 
                i.created_at, 
                'institution' AS request_type
            FROM institutions i
        `;

        const filterStatus = status && status !== "all" ? status : null;

        if (filterStatus) {
            employersQuery += ` WHERE e.status = '${filterStatus}'`;
            institutionsQuery += ` WHERE i.status = '${filterStatus}'`;
        }

        let combined = [];

        if (type === "employer") {
            const empRes = await pool.query(`${employersQuery} ORDER BY e.created_at DESC`);
            combined = empRes.rows;
        } else if (type === "institution") {
            const instRes = await pool.query(`${institutionsQuery} ORDER BY i.created_at DESC`);
            combined = instRes.rows;
        } else {
            const [empRes, instRes] = await Promise.all([
                pool.query(`${employersQuery} ORDER BY e.created_at DESC`),
                pool.query(`${institutionsQuery} ORDER BY i.created_at DESC`)
            ]);
            combined = [...empRes.rows, ...instRes.rows].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        }

        return res.json({
            success: true,
            requests: combined
        });
    } catch (err) {
        console.error("Get approvals error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const handleApprovalAction = async (req, res) => {
    const client = await pool.connect();
    try {
        const { type, id } = req.params; // type: 'employer' | 'institution', id: record id
        const { action, rejectionReason } = req.body; // action: 'approve' | 'reject'

        if (!["employer", "institution"].includes(type)) {
            return res.status(400).json({ success: false, message: "Invalid approval type" });
        }

        if (!["approve", "reject"].includes(action)) {
            return res.status(400).json({ success: false, message: "Invalid action. Use 'approve' or 'reject'" });
        }

        await client.query("BEGIN");

        const targetTable = type === "employer" ? "employers" : "institutions";
        const recordCheck = await client.query(
            `SELECT * FROM ${targetTable} WHERE id = $1`,
            [id]
        );

        if (recordCheck.rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({ success: false, message: `${type} request not found` });
        }

        const targetRecord = recordCheck.rows[0];
        const newStatus = action === "approve" ? "approved" : "rejected";
        const reasonText = action === "reject" ? (rejectionReason || "Application did not meet verification criteria") : null;

        // 1. Update the employers or institutions table
        await client.query(
            `UPDATE ${targetTable} 
             SET status = $1, rejection_reason = $2, updated_at = NOW() 
             WHERE id = $3`,
            [newStatus, reasonText, id]
        );

        // 2. Update the linked users table credentials status so they can now login!
        if (targetRecord.user_id) {
            await client.query(
                `UPDATE users 
                 SET status = $1, rejection_reason = $2, approved_at = ${action === "approve" ? "NOW()" : "NULL"}, approved_by = $3 
                 WHERE id = $4`,
                [newStatus, reasonText, req.user?.id || null, targetRecord.user_id]
            );
        }

        // 3. Log Audit
        const logAction = action === "approve" ? `${type.toUpperCase()}_APPROVED` : `${type.toUpperCase()}_REJECTED`;
        await client.query(
            `INSERT INTO admin_audit_logs (admin_id, action, target_type, target_id, details) 
             VALUES ($1, $2, $3, $4, $5)`,
            [
                req.user?.id || null,
                logAction,
                type,
                id,
                JSON.stringify({
                    name: targetRecord.company_name || targetRecord.institution_name,
                    email: targetRecord.email,
                    status: newStatus,
                    reason: reasonText
                })
            ]
        );

        await client.query("COMMIT");

        return res.json({
            success: true,
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} request has been ${newStatus}. ${
                action === "approve"
                    ? "Credentials are now valid and the user can log into their portal."
                    : "Request marked as rejected."
            }`,
            status: newStatus
        });
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Approval action error:", err);
        return res.status(500).json({ success: false, message: err.message });
    } finally {
        client.release();
    }
};

// ==========================================
// 3. STUDENT MANAGEMENT
// ==========================================
const getStudents = async (req, res) => {
    try {
        const { search, organization } = req.query;
        let query = `
            SELECT 
                u.id, 
                u.full_name, 
                u.email, 
                u.mobile, 
                u.usn, 
                u.organization, 
                u.status, 
                u.created_at,
                sp.course,
                sp.cgpa,
                sp.year,
                (SELECT COUNT(*) FROM resumes r WHERE r.user_id = u.id) AS resume_count
            FROM users u
            LEFT JOIN student_profiles sp ON sp.user_id = u.id
            WHERE u.role = 'student'
        `;

        const params = [];

        if (search) {
            params.push(`%${search.trim().toLowerCase()}%`);
            query += ` AND (LOWER(u.full_name) LIKE $${params.length} OR LOWER(u.email) LIKE $${params.length} OR LOWER(u.usn) LIKE $${params.length})`;
        }

        if (organization) {
            params.push(`%${organization.trim().toLowerCase()}%`);
            query += ` AND LOWER(u.organization) LIKE $${params.length}`;
        }

        query += " ORDER BY u.created_at DESC";

        const result = await pool.query(query, params);
        return res.json({ success: true, students: result.rows });
    } catch (err) {
        console.error("Get students error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const createStudent = async (req, res) => {
    try {
        const { fullName, email, mobile, usn, organization, password } = req.body;

        if (!fullName || !email || !usn || !password) {
            return res.status(400).json({ success: false, message: "Full Name, Email, USN, and Password are required" });
        }

        const existing = await pool.query(
            "SELECT id FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(usn) = LOWER($2)",
            [email.trim(), usn.trim()]
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({ success: false, message: "Email or USN is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (full_name, email, mobile, usn, organization, password, role, status)
             VALUES ($1, $2, $3, $4, $5, $6, 'student', 'approved')
             RETURNING id, full_name, email, mobile, usn, organization, status, created_at`,
            [fullName, email.trim(), mobile || "", usn.trim(), organization || "", hashedPassword]
        );

        return res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: result.rows[0]
        });
    } catch (err) {
        console.error("Create student error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, mobile, usn, organization, status } = req.body;

        const updateRes = await pool.query(
            `UPDATE users 
             SET full_name = COALESCE($1, full_name),
                 email = COALESCE($2, email),
                 mobile = COALESCE($3, mobile),
                 usn = COALESCE($4, usn),
                 organization = COALESCE($5, organization),
                 status = COALESCE($6, status)
             WHERE id = $7 AND role = 'student'
             RETURNING id, full_name, email, mobile, usn, organization, status`,
            [fullName, email, mobile, usn, organization, status, id]
        );

        if (updateRes.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        return res.json({
            success: true,
            message: "Student details updated successfully",
            student: updateRes.rows[0]
        });
    } catch (err) {
        console.error("Update student error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const updateStudentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' (active) | 'suspended'

        const result = await pool.query(
            "UPDATE users SET status = $1 WHERE id = $2 AND role = 'student' RETURNING id, full_name, status",
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        return res.json({
            success: true,
            message: `Student status changed to ${status}`,
            student: result.rows[0]
        });
    } catch (err) {
        console.error("Update student status error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM users WHERE id = $1 AND role = 'student' RETURNING id", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        return res.json({ success: true, message: "Student deleted successfully" });
    } catch (err) {
        console.error("Delete student error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ==========================================
// 4. EMPLOYER MANAGEMENT
// ==========================================
const getEmployers = async (req, res) => {
    try {
        const { search, status } = req.query;
        let query = `
            SELECT 
                e.*, 
                u.status AS user_status, 
                u.created_at AS user_registered_at 
            FROM employers e
            JOIN users u ON u.id = e.user_id
            WHERE 1=1
        `;
        const params = [];

        if (search) {
            params.push(`%${search.trim().toLowerCase()}%`);
            query += ` AND (LOWER(e.company_name) LIKE $${params.length} OR LOWER(e.contact_person) LIKE $${params.length} OR LOWER(e.email) LIKE $${params.length} OR LOWER(e.industry) LIKE $${params.length})`;
        }

        if (status && status !== "all") {
            params.push(status);
            query += ` AND e.status = $${params.length}`;
        }

        query += " ORDER BY e.created_at DESC";

        const result = await pool.query(query, params);
        return res.json({ success: true, employers: result.rows });
    } catch (err) {
        console.error("Get employers error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const updateEmployer = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, contactPerson, email, phone, location, industry, website, status } = req.body;

        const updateRes = await pool.query(
            `UPDATE employers 
             SET company_name = COALESCE($1, company_name),
                 contact_person = COALESCE($2, contact_person),
                 email = COALESCE($3, email),
                 phone = COALESCE($4, phone),
                 location = COALESCE($5, location),
                 industry = COALESCE($6, industry),
                 website = COALESCE($7, website),
                 status = COALESCE($8, status),
                 updated_at = NOW()
             WHERE id = $9
             RETURNING *`,
            [companyName, contactPerson, email, phone, location, industry, website, status, id]
        );

        if (updateRes.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Employer not found" });
        }

        // Also sync status with users table if changed
        if (status) {
            await pool.query(
                "UPDATE users SET status = $1 WHERE id = $2",
                [status, updateRes.rows[0].user_id]
            );
        }

        return res.json({
            success: true,
            message: "Employer details updated successfully",
            employer: updateRes.rows[0]
        });
    } catch (err) {
        console.error("Update employer error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const updateEmployerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' | 'suspended' | 'rejected' | 'pending'

        const empRes = await pool.query(
            "UPDATE employers SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
            [status, id]
        );

        if (empRes.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Employer not found" });
        }

        await pool.query(
            "UPDATE users SET status = $1 WHERE id = $2",
            [status, empRes.rows[0].user_id]
        );

        return res.json({
            success: true,
            message: `Employer status updated to ${status}`,
            employer: empRes.rows[0]
        });
    } catch (err) {
        console.error("Update employer status error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const deleteEmployer = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await pool.query("SELECT user_id FROM employers WHERE id = $1", [id]);
        if (emp.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Employer not found" });
        }

        // Deleting user cascades to employer
        await pool.query("DELETE FROM users WHERE id = $1", [emp.rows[0].user_id]);
        return res.json({ success: true, message: "Employer account removed successfully" });
    } catch (err) {
        console.error("Delete employer error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ==========================================
// 5. INSTITUTION MANAGEMENT
// ==========================================
const getInstitutions = async (req, res) => {
    try {
        const { search, status } = req.query;
        let query = `
            SELECT 
                i.*, 
                u.status AS user_status, 
                u.created_at AS user_registered_at 
            FROM institutions i
            JOIN users u ON u.id = i.user_id
            WHERE 1=1
        `;
        const params = [];

        if (search) {
            params.push(`%${search.trim().toLowerCase()}%`);
            query += ` AND (LOWER(i.institution_name) LIKE $${params.length} OR LOWER(i.admin_name) LIKE $${params.length} OR LOWER(i.email) LIKE $${params.length} OR LOWER(i.institution_type) LIKE $${params.length})`;
        }

        if (status && status !== "all") {
            params.push(status);
            query += ` AND i.status = $${params.length}`;
        }

        query += " ORDER BY i.created_at DESC";

        const result = await pool.query(query, params);
        return res.json({ success: true, institutions: result.rows });
    } catch (err) {
        console.error("Get institutions error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const updateInstitution = async (req, res) => {
    try {
        const { id } = req.params;
        const { institutionName, adminName, designation, email, phone, website, institutionType, status } = req.body;

        const updateRes = await pool.query(
            `UPDATE institutions 
             SET institution_name = COALESCE($1, institution_name),
                 admin_name = COALESCE($2, admin_name),
                 designation = COALESCE($3, designation),
                 email = COALESCE($4, email),
                 phone = COALESCE($5, phone),
                 website = COALESCE($6, website),
                 institution_type = COALESCE($7, institution_type),
                 status = COALESCE($8, status),
                 updated_at = NOW()
             WHERE id = $9
             RETURNING *`,
            [institutionName, adminName, designation, email, phone, website, institutionType, status, id]
        );

        if (updateRes.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Institution not found" });
        }

        if (status) {
            await pool.query(
                "UPDATE users SET status = $1 WHERE id = $2",
                [status, updateRes.rows[0].user_id]
            );
        }

        return res.json({
            success: true,
            message: "Institution details updated successfully",
            institution: updateRes.rows[0]
        });
    } catch (err) {
        console.error("Update institution error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const updateInstitutionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' | 'suspended' | 'rejected' | 'pending'

        const instRes = await pool.query(
            "UPDATE institutions SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
            [status, id]
        );

        if (instRes.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Institution not found" });
        }

        await pool.query(
            "UPDATE users SET status = $1 WHERE id = $2",
            [status, instRes.rows[0].user_id]
        );

        return res.json({
            success: true,
            message: `Institution status updated to ${status}`,
            institution: instRes.rows[0]
        });
    } catch (err) {
        console.error("Update institution status error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const deleteInstitution = async (req, res) => {
    try {
        const { id } = req.params;
        const inst = await pool.query("SELECT user_id FROM institutions WHERE id = $1", [id]);
        if (inst.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Institution not found" });
        }

        await pool.query("DELETE FROM users WHERE id = $1", [inst.rows[0].user_id]);
        return res.json({ success: true, message: "Institution account removed successfully" });
    } catch (err) {
        console.error("Delete institution error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ==========================================
// 6. OPPORTUNITIES / GIGS MANAGEMENT
// ==========================================
const getOpportunities = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM opportunities ORDER BY created_at DESC");
        return res.json({ success: true, opportunities: result.rows });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

const createOpportunity = async (req, res) => {
    try {
        const { title, companyName, type, location, stipend, duration, skills, description, status } = req.body;

        if (!title || !companyName) {
            return res.status(400).json({ success: false, message: "Title and Company Name are required" });
        }

        const skillsArr = Array.isArray(skills) ? skills : (skills ? skills.split(",").map(s => s.trim()) : []);

        const result = await pool.query(
            `INSERT INTO opportunities (title, company_name, type, location, stipend, duration, skills, description, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *`,
            [
                title,
                companyName,
                type || "Internship",
                location || "Remote",
                stipend || "Competitive",
                duration || "3 Months",
                skillsArr,
                description || "",
                status || "active"
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Opportunity created successfully",
            opportunity: result.rows[0]
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

const updateOpportunity = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, companyName, type, location, stipend, duration, skills, description, status } = req.body;

        const skillsArr = Array.isArray(skills) ? skills : (skills ? skills.split(",").map(s => s.trim()) : null);

        const result = await pool.query(
            `UPDATE opportunities 
             SET title = COALESCE($1, title),
                 company_name = COALESCE($2, company_name),
                 type = COALESCE($3, type),
                 location = COALESCE($4, location),
                 stipend = COALESCE($5, stipend),
                 duration = COALESCE($6, duration),
                 skills = COALESCE($7, skills),
                 description = COALESCE($8, description),
                 status = COALESCE($9, status)
             WHERE id = $10
             RETURNING *`,
            [title, companyName, type, location, stipend, duration, skillsArr, description, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Opportunity not found" });
        }

        return res.json({
            success: true,
            message: "Opportunity updated successfully",
            opportunity: result.rows[0]
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

const deleteOpportunity = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM opportunities WHERE id = $1 RETURNING id", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Opportunity not found" });
        }
        return res.json({ success: true, message: "Opportunity removed successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ==========================================
// 7. AUDIT LOGS
// ==========================================
const getAuditLogs = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.*, u.full_name AS admin_name, u.email AS admin_email
            FROM admin_audit_logs l
            LEFT JOIN users u ON u.id = l.admin_id
            ORDER BY l.created_at DESC
            LIMIT 50
        `);
        return res.json({ success: true, logs: result.rows });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    getDashboardStats,
    getApprovals,
    handleApprovalAction,
    getStudents,
    createStudent,
    updateStudent,
    updateStudentStatus,
    deleteStudent,
    getEmployers,
    updateEmployer,
    updateEmployerStatus,
    deleteEmployer,
    getInstitutions,
    updateInstitution,
    updateInstitutionStatus,
    deleteInstitution,
    getOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getAuditLogs
};
