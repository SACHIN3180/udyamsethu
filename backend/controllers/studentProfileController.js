const pool = require("../config/db");

// ======================================================
// GET STUDENT PROFILE
// ======================================================

const getStudentProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT
                u.id,
                u.full_name AS "fullName",
                u.email,
                u.mobile AS phone,
                u.usn,
                u.parent_mobile AS "parentMobile",
                u.organization,

                sp.location,
                sp.date_of_birth AS "dateOfBirth",
                sp.gender,
                sp.course,
                sp.specialization,
                sp.year,
                sp.graduation_year AS "graduationYear",
                sp.cgpa,
                sp.career_goal AS "careerGoal",
                sp.preferred_role AS "preferredRole",
                sp.preferred_location AS "preferredLocation",
                sp.experience,
                sp.skills,
                sp.linkedin,
                sp.github,
                sp.portfolio,
                sp.resume,
                sp.internship_preference AS "internshipPreference",
                sp.work_mode AS "workMode",
                sp.preferred_domain AS "preferredDomain",
                sp.languages,
                sp.profile_visibility AS "profileVisibility",
                sp.job_alerts AS "jobAlerts"

            FROM users u

            LEFT JOIN student_profiles sp
                ON u.id = sp.user_id

            WHERE u.id = $1
            `,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const row = result.rows[0];

        const profile = {
            fullName: row.fullName || "",
            email: row.email || "",
            phone: row.phone || "",
            usn: row.usn || "",

            location: row.location || "",
            dateOfBirth: row.dateOfBirth || "",
            gender: row.gender || "",

            university: row.organization || "",
            course: row.course || "",
            specialization: row.specialization || "",
            year: row.year || "",
            graduationYear: row.graduationYear || "",
            cgpa: row.cgpa || "",

            careerGoal: row.careerGoal || "",
            preferredRole: row.preferredRole || "",
            preferredLocation: row.preferredLocation || "",
            experience: row.experience || "Fresher",

            skills: Array.isArray(row.skills)
                ? row.skills
                : [],

            linkedin: row.linkedin || "",
            github: row.github || "",
            portfolio: row.portfolio || "",

            resume: row.resume || "",

            internshipPreference:
                row.internshipPreference || "",

            workMode: row.workMode || "",

            preferredDomain:
                row.preferredDomain || "",

            languages: Array.isArray(row.languages)
                ? row.languages
                : [],

            profileVisibility:
                row.profileVisibility ?? true,

            jobAlerts:
                row.jobAlerts ?? true
        };

        res.json({
            success: true,
            profile
        });

    } catch (error) {

        console.error(
            "Get student profile error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ======================================================
// CREATE / UPDATE STUDENT PROFILE
// ======================================================

const updateStudentProfile = async (req, res) => {

    const client = await pool.connect();

    try {

        const userId = req.user.id;

        // ==================================================
        // DATA FROM REACT
        // ==================================================

        const {
            fullName,
            email,
            phone,
            usn,

            location,
            dateOfBirth,
            gender,

            university,
            course,
            specialization,
            year,
            graduationYear,
            cgpa,

            careerGoal,
            preferredRole,
            preferredLocation,
            experience,

            skills,

            linkedin,
            github,
            portfolio,

            resume,

            internshipPreference,
            workMode,
            preferredDomain,

            languages,

            profileVisibility,
            jobAlerts
        } = req.body;


        // ==================================================
        // START TRANSACTION
        // ==================================================

        await client.query("BEGIN");


        // ==================================================
        // UPDATE USERS TABLE
        // ==================================================

        await client.query(
            `
            UPDATE users

            SET
                full_name = $1,
                email = $2,
                mobile = $3,
                usn = $4,
                organization = $5
            WHERE id = $6
            `,
            [
                fullName || null,
                email || null,
                phone || null,
                usn || null,
                university || null,
                userId
            ]
        );


        // ==================================================
        // CREATE / UPDATE STUDENT PROFILE
        // ==================================================

        await client.query(
            `
            INSERT INTO student_profiles (
                user_id,
                location,
                date_of_birth,
                gender,
                course,
                specialization,
                year,
                graduation_year,
                cgpa,
                career_goal,
                preferred_role,
                preferred_location,
                experience,
                skills,
                linkedin,
                github,
                portfolio,
                resume,
                internship_preference,
                work_mode,
                preferred_domain,
                languages,
                profile_visibility,
                job_alerts,
                updated_at
            )

            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11,
                $12,
                $13,
                $14,
                $15,
                $16,
                $17,
                $18,
                $19,
                $20,
                $21,
                $22,
                $23,
                $24,
                CURRENT_TIMESTAMP
            )

            ON CONFLICT (user_id)

            DO UPDATE SET

                location = EXCLUDED.location,
                date_of_birth = EXCLUDED.date_of_birth,
                gender = EXCLUDED.gender,
                course = EXCLUDED.course,
                specialization = EXCLUDED.specialization,
                year = EXCLUDED.year,
                graduation_year = EXCLUDED.graduation_year,
                cgpa = EXCLUDED.cgpa,
                career_goal = EXCLUDED.career_goal,
                preferred_role = EXCLUDED.preferred_role,
                preferred_location = EXCLUDED.preferred_location,
                experience = EXCLUDED.experience,
                skills = EXCLUDED.skills,
                linkedin = EXCLUDED.linkedin,
                github = EXCLUDED.github,
                portfolio = EXCLUDED.portfolio,
                resume = EXCLUDED.resume,
                internship_preference = EXCLUDED.internship_preference,
                work_mode = EXCLUDED.work_mode,
                preferred_domain = EXCLUDED.preferred_domain,
                languages = EXCLUDED.languages,
                profile_visibility = EXCLUDED.profile_visibility,
                job_alerts = EXCLUDED.job_alerts,
                updated_at = CURRENT_TIMESTAMP
            `,
            [
                userId,

                location || null,
                dateOfBirth || null,
                gender || null,

                course || null,
                specialization || null,
                year || null,
                graduationYear || null,
                cgpa || null,

                careerGoal || null,
                preferredRole || null,
                preferredLocation || null,
                experience || "Fresher",

                Array.isArray(skills) ? skills : [],

                linkedin || null,
                github || null,
                portfolio || null,

                resume || null,

                internshipPreference || null,
                workMode || null,
                preferredDomain || null,

               Array.isArray(languages) ? languages : [],

                profileVisibility ?? true,
                jobAlerts ?? true
            ]
        );


        // ==================================================
        // GET UPDATED COMPLETE PROFILE
        // ==================================================

        const result = await client.query(
            `
            SELECT
                u.id,
                u.full_name AS "fullName",
                u.email,
                u.mobile AS phone,
                u.usn,
                u.organization,

                sp.location,
                sp.date_of_birth AS "dateOfBirth",
                sp.gender,
                sp.course,
                sp.specialization,
                sp.year,
                sp.graduation_year AS "graduationYear",
                sp.cgpa,
                sp.career_goal AS "careerGoal",
                sp.preferred_role AS "preferredRole",
                sp.preferred_location AS "preferredLocation",
                sp.experience,
                sp.skills,
                sp.linkedin,
                sp.github,
                sp.portfolio,
                sp.resume,
                sp.internship_preference AS "internshipPreference",
                sp.work_mode AS "workMode",
                sp.preferred_domain AS "preferredDomain",
                sp.languages,
                sp.profile_visibility AS "profileVisibility",
                sp.job_alerts AS "jobAlerts"

            FROM users u

            LEFT JOIN student_profiles sp
                ON u.id = sp.user_id

            WHERE u.id = $1
            `,
            [userId]
        );


        // ==================================================
        // COMMIT
        // ==================================================

        await client.query("COMMIT");


        // ==================================================
        // FORMAT RESPONSE
        // ==================================================

        const row = result.rows[0];

        const profile = {
            fullName: row.fullName || "",
            email: row.email || "",
            phone: row.phone || "",
            usn: row.usn || "",

            location: row.location || "",
            dateOfBirth: row.dateOfBirth || "",
            gender: row.gender || "",

            university: row.organization || "",
            course: row.course || "",
            specialization: row.specialization || "",
            year: row.year || "",
            graduationYear: row.graduationYear || "",
            cgpa: row.cgpa || "",

            careerGoal: row.careerGoal || "",
            preferredRole: row.preferredRole || "",
            preferredLocation: row.preferredLocation || "",
            experience: row.experience || "Fresher",

            skills: Array.isArray(row.skills)
                ? row.skills
                : [],

            linkedin: row.linkedin || "",
            github: row.github || "",
            portfolio: row.portfolio || "",

            resume: row.resume || "",

            internshipPreference:
                row.internshipPreference || "",

            workMode: row.workMode || "",

            preferredDomain:
                row.preferredDomain || "",

            languages: Array.isArray(row.languages)
                ? row.languages
                : [],

            profileVisibility:
                row.profileVisibility ?? true,

            jobAlerts:
                row.jobAlerts ?? true
        };


        res.json({
            success: true,
            message: "Profile saved successfully",
            profile
        });


    } catch (error) {

        await client.query("ROLLBACK");

        console.error(
            "Update student profile error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to save profile",
            error: error.message
        });

    } finally {

        client.release();

    }
};


module.exports = {
    getStudentProfile,
    updateStudentProfile
};