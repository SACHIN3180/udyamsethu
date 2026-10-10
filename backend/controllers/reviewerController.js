const pool = require("../config/db");

const approveSkillLevel = async (req, res) => {

    const client = await pool.connect();

    try {

        const {
            studentSkillId,
            level
        } = req.body;

        if (!studentSkillId || !level) {
            return res.status(400).json({
                success: false,
                message: "studentSkillId and level are required"
            });
        }

        const validLevels = [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert"
        ];

        if (!validLevels.includes(level)) {
            return res.status(400).json({
                success: false,
                message: "Invalid level"
            });
        }

        await client.query("BEGIN");

        /*
         * Find the student's skill
         */
        const skillResult = await client.query(
            `
            SELECT
                ss.id,
                ss.student_id,
                ss.skill_id,
                ss.current_level,
                ss.status,
                sc.name AS skill_name
            FROM student_skills ss
            JOIN skill_catalog sc
                ON sc.id = ss.skill_id
            WHERE ss.id = $1
            `,
            [studentSkillId]
        );

        if (skillResult.rows.length === 0) {

            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                message: "Student skill not found"
            });
        }

        const studentSkill = skillResult.rows[0];

        /*
         * Find the level
         */
        const levelResult = await client.query(
            `
            SELECT *
            FROM student_skill_levels
            WHERE student_skill_id = $1
            AND level = $2
            `,
            [
                studentSkillId,
                level
            ]
        );

        if (levelResult.rows.length === 0) {

            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                message: "Skill level not found"
            });
        }

        const currentLevel = levelResult.rows[0];

        /*
         * Only review_pending levels can be approved
         */
        if (currentLevel.status !== "review_pending") {

            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message:
                    "This level is not waiting for review"
            });
        }

        /*
         * Level must actually be 100%
         */
        if (currentLevel.progress < 100) {

            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message:
                    "Level must reach 100% before approval"
            });
        }

        /*
         * Mark current level completed
         */
        await client.query(
            `
            UPDATE student_skill_levels
            SET
                status = 'completed',
                completed_at = CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [currentLevel.id]
        );

        /*
         * Determine next level
         */
        const levelOrder = [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert"
        ];

        const currentIndex =
            levelOrder.indexOf(level);

        const isExpert =
            level === "Expert";

        if (isExpert) {

            await client.query(
                `
                UPDATE student_skills
                SET
                    current_level = 'Expert',
                    status = 'completed',
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $1
                `,
                [studentSkillId]
            );

            await client.query(
                `
                INSERT INTO notifications
                (
                    student_id,
                    title,
                    message,
                    type
                )
                VALUES ($1, $2, $3, $4)
                `,
                [
                    studentSkill.student_id,
                    `${studentSkill.skill_name} completed`,
                    `Congratulations! You have completed the Expert level for ${studentSkill.skill_name}.`,
                    "skill_completed"
                ]
            );

        } else {

            const nextLevel =
                levelOrder[currentIndex + 1];

            /*
             * Unlock next level
             */
            await client.query(
                `
                UPDATE student_skill_levels
                SET
                    status = 'active',
                    started_at = CURRENT_TIMESTAMP
                WHERE student_skill_id = $1
                AND level = $2
                `,
                [
                    studentSkillId,
                    nextLevel
                ]
            );

            /*
             * Update current level
             */
            await client.query(
                `
                UPDATE student_skills
                SET
                    current_level = $1,
                    status = 'active',
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                `,
                [
                    nextLevel,
                    studentSkillId
                ]
            );

            /*
             * Notify student
             */
            await client.query(
                `
                INSERT INTO notifications
                (
                    student_id,
                    title,
                    message,
                    type
                )
                VALUES ($1, $2, $3, $4)
                `,
                [
                    studentSkill.student_id,
                    `${nextLevel} level unlocked`,
                    `${studentSkill.skill_name} ${nextLevel} level has been unlocked.`,
                    "level_unlocked"
                ]
            );
        }

        await client.query("COMMIT");

        return res.json({
            success: true,
            message: isExpert
                ? "Expert level approved. Skill completed."
                : `${level} approved. Next level unlocked.`,
            skill: studentSkill.skill_name,
            approvedLevel: level,
            nextLevel: isExpert
                ? null
                : levelOrder[currentIndex + 1]
        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(
            "Approve skill level error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to approve skill level"
        });

    } finally {

        client.release();
    }
};

const getPendingReviews = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                ss.id AS student_skill_id,
                ss.student_id,
                u.full_name,
                u.email,
                sc.id AS skill_id,
                sc.name AS skill_name,
                sc.category,
                ss.current_level,
                ssl.progress,
                ssl.status
            FROM student_skills ss

            JOIN users u
                ON u.id = ss.student_id

            JOIN skill_catalog sc
                ON sc.id = ss.skill_id

            JOIN student_skill_levels ssl
                ON ssl.student_skill_id = ss.id
                AND ssl.level = ss.current_level

            WHERE ss.status = 'review_pending'
            AND ssl.status = 'review_pending'

            ORDER BY ssl.completed_at ASC
        `);

        return res.json({
            success: true,
            reviews: result.rows
        });

    } catch (error) {

        console.error(
            "Get pending reviews error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to load pending reviews"
        });
    }
};


module.exports = {
    approveSkillLevel,
    getPendingReviews
};