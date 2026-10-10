const pool = require("../config/db");


// =====================================================
// GET ALL AVAILABLE SKILLS
// =====================================================

const getSkillCatalog = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                name,
                category,
                description
            FROM skill_catalog
            ORDER BY category, name
        `);


        res.json({
            success: true,
            skills: result.rows
        });


    } catch (error) {

        console.error(
            "Get skill catalog error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to get skills"
        });
    }
};



// =====================================================
// GET STUDENT'S SELECTED SKILLS
// =====================================================

const getStudentSkills = async (req, res) => {

    try {

        const studentId = req.user.id;


        const result = await pool.query(`
            SELECT

                ss.id AS student_skill_id,

                ss.skill_id,

                sc.name AS skill_name,

                sc.category,

                sc.description,

                ss.current_level,

                ss.status,

                ssl.progress,

                ssl.status AS level_status

            FROM student_skills ss

            JOIN skill_catalog sc
                ON sc.id = ss.skill_id

            JOIN student_skill_levels ssl
                ON ssl.student_skill_id = ss.id
                AND ssl.level = ss.current_level

            WHERE ss.student_id = $1

            ORDER BY ss.created_at DESC
        `, [
            studentId
        ]);


        res.json({

            success: true,

            skills: result.rows
        });


    } catch (error) {

        console.error(
            "Get student skills error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to get student skills"
        });
    }
};



// =====================================================
// ADD SKILL TO STUDENT
// =====================================================

const addSkill = async (req, res) => {

    try {

        const studentId =
            req.user.id;

        const {
            skillId
        } = req.body;


        if (!skillId) {

            return res.status(400).json({

                success: false,

                message:
                    "skillId is required"
            });
        }


        const existing =
            await pool.query(
                `
                SELECT id

                FROM student_skills

                WHERE student_id = $1

                AND skill_id = $2
                `,
                [
                    studentId,

                    skillId
                ]
            );


        if (existing.rows.length > 0) {

            return res.status(409).json({

                success: false,

                message:
                    "Skill already added"
            });
        }


        const skill =
            await pool.query(
                `
                SELECT

                    id,

                    name,

                    category

                FROM skill_catalog

                WHERE id = $1
                `,
                [
                    skillId
                ]
            );


        if (skill.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Skill not found"
            });
        }


        const client =
            await pool.connect();


        try {

            await client.query(
                "BEGIN"
            );


            const studentSkill =
                await client.query(
                    `
                    INSERT INTO student_skills
                    (
                        student_id,

                        skill_id,

                        current_level,

                        status
                    )

                    VALUES
                    (
                        $1,

                        $2,

                        'Beginner',

                        'active'
                    )

                    RETURNING *
                    `,
                    [
                        studentId,

                        skillId
                    ]
                );


            const studentSkillId =
                studentSkill.rows[0].id;


            const levels = [
                "Beginner",
                "Intermediate",
                "Advanced",
                "Expert"
            ];


            for (
                let i = 0;
                i < levels.length;
                i++
            ) {

                const level =
                    levels[i];


                await client.query(
                    `
                    INSERT INTO student_skill_levels
                    (
                        student_skill_id,

                        level,

                        progress,

                        status,

                        started_at
                    )

                    VALUES
                    (
                        $1,

                        $2,

                        0,

                        $3,

                        $4
                    )
                    `,
                    [
                        studentSkillId,

                        level,

                        i === 0
                            ? "active"
                            : "locked",

                        i === 0
                            ? new Date()
                            : null
                    ]
                );
            }


            await client.query(
                "COMMIT"
            );


            res.status(201).json({

                success: true,

                message:
                    "Skill added successfully",

                studentSkill:
                    studentSkill.rows[0]
            });


        } catch (error) {

            await client.query(
                "ROLLBACK"
            );

            throw error;

        } finally {

            client.release();
        }


    } catch (error) {

        console.error(
            "Add skill error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to add skill"
        });
    }
};



// =====================================================
// REMOVE SKILL
// =====================================================

const removeSkill = async (req, res) => {

    try {

        const studentId =
            req.user.id;

        const {
            studentSkillId
        } = req.params;


        const result =
            await pool.query(`
                DELETE FROM student_skills

                WHERE id = $1

                AND student_id = $2

                RETURNING id
            `, [
                studentSkillId,
                studentId
            ]);


        if (
            result.rows.length === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Student skill not found"
            });
        }


        res.json({

            success: true,

            message:
                "Skill removed successfully"
        });


    } catch (error) {

        console.error(
            "Remove skill error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to remove skill"
        });
    }
};



// =====================================================
// GET SKILL STATS
// =====================================================

const getSkillStats = async (req, res) => {

    try {

        const studentId =
            req.user.id;


        const result =
            await pool.query(`
                SELECT

                    COUNT(*) AS total_skills,

                    COUNT(*) FILTER (
                        WHERE
                            ss.current_level IN (
                                'Advanced',
                                'Expert'
                            )
                    ) AS advanced_skills,

                    COUNT(
                        DISTINCT sc.category
                    ) AS categories

                FROM student_skills ss

                JOIN skill_catalog sc
                    ON sc.id = ss.skill_id

                WHERE ss.student_id = $1
            `, [
                studentId
            ]);


        res.json({

            success: true,

            stats: {

                totalSkills:
                    Number(
                        result.rows[0].total_skills
                    ),

                advancedSkills:
                    Number(
                        result.rows[0].advanced_skills
                    ),

                categories:
                    Number(
                        result.rows[0].categories
                    )
            }
        });


    } catch (error) {

        console.error(
            "Skill stats error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to get skill statistics"
        });
    }
};



module.exports = {

    getSkillCatalog,

    getStudentSkills,

    addSkill,

    removeSkill,

    getSkillStats
};