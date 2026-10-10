const pool = require("../config/db");

const {
    generateQuestions
} = require("../services/aiQuestionService");


// ======================================================
// GET LEARNING DETAILS
// ======================================================

const getLearningDetails = async (req, res) => {

    try {

        const studentId = req.user.id;

        const { studentSkillId } = req.params;


        // ==================================================
        // GET STUDENT SKILL
        // ==================================================

        const skillResult = await pool.query(
            `
            SELECT

                ss.id AS student_skill_id,

                ss.student_id,

                ss.skill_id,

                ss.current_level,

                ss.status AS skill_status,

                sc.name AS skill_name,

                sc.category,

                sc.description,

                ssl.id AS level_id,

                ssl.progress,

                ssl.status AS level_status

            FROM student_skills ss

            JOIN skill_catalog sc
                ON sc.id = ss.skill_id

            JOIN student_skill_levels ssl
                ON ssl.student_skill_id = ss.id
                AND ssl.level = ss.current_level

            WHERE ss.id = $1
            AND ss.student_id = $2
            `,
            [
                studentSkillId,
                studentId
            ]
        );


        if (skillResult.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Student skill not found"
            });
        }


        const skill = skillResult.rows[0];


        // ==================================================
        // GET MODULES + STUDENT MODULE PROGRESS
        // ==================================================

        const moduleResult = await pool.query(
            `
            SELECT

                slm.id,

                slm.skill_id,

                slm.level,

                slm.title,

                slm.description,

                slm.order_number,

                COALESCE(
                    smp.status,
                    'locked'
                ) AS status,

                COALESCE(
                    smp.current_question,
                    0
                ) AS current_question,

                COALESCE(
                    smp.score,
                    0
                ) AS score,

                smp.started_at,

                smp.completed_at

            FROM skill_learning_modules slm

            LEFT JOIN student_module_progress smp

                ON smp.module_id = slm.id

                AND smp.student_skill_id = $3

            WHERE slm.skill_id = $1

            AND slm.level = $2

            ORDER BY slm.order_number ASC
            `,
            [
                skill.skill_id,
                skill.current_level,
                studentSkillId
            ]
        );


        let modules = moduleResult.rows;


        // ==================================================
        // START FIRST MODULE IF NOTHING HAS STARTED
        // ==================================================

        const hasStartedModule = modules.some(
            module =>
                module.status === "in_progress" ||
                module.status === "completed"
        );


        if (
            modules.length > 0 &&
            !hasStartedModule
        ) {

            await pool.query(
                `
                INSERT INTO student_module_progress
                (
                    student_skill_id,
                    module_id,
                    current_question,
                    score,
                    status
                )

                VALUES
                (
                    $1,
                    $2,
                    0,
                    0,
                    'in_progress'
                )

                ON CONFLICT
                (
                    student_skill_id,
                    module_id
                )

                DO NOTHING
                `,
                [
                    studentSkillId,
                    modules[0].id
                ]
            );


            // Reload modules after creating first progress

            const updatedModuleResult =
                await pool.query(
                    `
                    SELECT

                        slm.id,

                        slm.skill_id,

                        slm.level,

                        slm.title,

                        slm.description,

                        slm.order_number,

                        COALESCE(
                            smp.status,
                            'locked'
                        ) AS status,

                        COALESCE(
                            smp.current_question,
                            0
                        ) AS current_question,

                        COALESCE(
                            smp.score,
                            0
                        ) AS score,

                        smp.started_at,

                        smp.completed_at

                    FROM skill_learning_modules slm

                    LEFT JOIN student_module_progress smp

                        ON smp.module_id = slm.id

                        AND smp.student_skill_id = $3

                    WHERE slm.skill_id = $1

                    AND slm.level = $2

                    ORDER BY slm.order_number ASC
                    `,
                    [
                        skill.skill_id,
                        skill.current_level,
                        studentSkillId
                    ]
                );

            modules = updatedModuleResult.rows;
        }


        // ==================================================
        // FIND CURRENT MODULE
        // ==================================================

        const currentModule =
            modules.find(
                module =>
                    module.status === "in_progress"
            ) || null;


        // ==================================================
        // RESPONSE
        // ==================================================

        res.json({

            success: true,

            skill,

            currentModule,

            modules
        });


    } catch (error) {

        console.error(
            "Learning details error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load learning details"
        });
    }
};



// ======================================================
// GET MODULE
// ======================================================

const getModule = async (req, res) => {

    try {

        const studentId =
            req.user.id;

        const {
            studentSkillId,
            moduleId
        } = req.params;


        const result =
            await pool.query(
                `
                SELECT

                    ss.id AS student_skill_id,

                    ss.current_level,

                    slm.id AS module_id,

                    slm.title,

                    slm.description,

                    slm.order_number,

                    sc.name AS skill_name,

                    sc.category

                FROM student_skills ss

                JOIN skill_catalog sc
                    ON sc.id = ss.skill_id

                JOIN skill_learning_modules slm
                    ON slm.skill_id = ss.skill_id
                    AND slm.level = ss.current_level

                WHERE ss.id = $1

                AND ss.student_id = $2

                AND slm.id = $3
                `,
                [
                    studentSkillId,
                    studentId,
                    moduleId
                ]
            );


        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Module not found"
            });
        }


        res.json({

            success: true,

            module:
                result.rows[0]
        });


    } catch (error) {

        console.error(
            "Get module error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load module"
        });
    }
};



// ======================================================
// GENERATE AI QUESTIONS
// ======================================================

const generateSkillQuestions = async (
    req,
    res
) => {

    try {

        const studentId =
            req.user.id;


        const {
            studentSkillId,
            moduleId,
            count = 5
        } = req.body;


        if (
            !studentSkillId ||
            !moduleId
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "studentSkillId and moduleId are required"
            });
        }


        // ----------------------------------------------
        // Check student's skill
        // ----------------------------------------------

        const skillResult =
            await pool.query(
                `
                SELECT

                    ss.id AS student_skill_id,

                    ss.skill_id,

                    ss.current_level,

                    ss.status,

                    sc.name AS skill_name,

                    sc.category,

                    sc.description AS skill_description,

                    slm.id AS module_id,

                    slm.title AS module_title,

                    slm.description AS module_description

                FROM student_skills ss

                JOIN skill_catalog sc
                    ON sc.id = ss.skill_id

                JOIN skill_learning_modules slm
                    ON slm.skill_id = ss.skill_id
                    AND slm.level = ss.current_level

                WHERE ss.id = $1

                AND ss.student_id = $2

                AND slm.id = $3
                `,
                [
                    studentSkillId,
                    studentId,
                    moduleId
                ]
            );

        const moduleProgressResult =
            await pool.query(
                `
        SELECT

            status,

            current_question,

            score

        FROM student_module_progress

        WHERE student_skill_id = $1

        AND module_id = $2
        `,
                [
                    studentSkillId,

                    moduleId
                ]
            );


        if (
            moduleProgressResult.rows.length > 0 &&
            moduleProgressResult.rows[0].status === "completed"
        ) {

            return res.status(400).json({

                success: false,

                moduleCompleted: true,

                message:
                    "This module has already been completed"
            });
        }


        if (skillResult.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Skill or module not found"
            });
        }


        const skill =
            skillResult.rows[0];


        // ----------------------------------------------
        // Check existing questions
        // ----------------------------------------------

        const existingResult =
            await pool.query(
                `
                SELECT

                    id,

                    question,

                    question_type,

                    options,

                    explanation

                FROM skill_questions

                WHERE skill_id = $1

                AND level = $2

                AND module_id = $3

                ORDER BY id DESC

                LIMIT $4
                `,
                [
                    skill.skill_id,
                    skill.current_level,
                    moduleId,
                    Number(count)
                ]
            );


        // ----------------------------------------------
        // Use existing questions
        // ----------------------------------------------

        if (
            existingResult.rows.length >=
            Number(count)
        ) {

            return res.json({

                success: true,

                source: "database",

                questions:
                    existingResult.rows
            });
        }


        // ----------------------------------------------
        // Generate AI questions
        // ----------------------------------------------

        const aiResult =
            await generateQuestions({

                skillName:
                    skill.skill_name,

                category:
                    skill.category,

                level:
                    skill.current_level,

                moduleTitle:
                    skill.module_title,

                moduleDescription:
                    skill.module_description,

                count:
                    Number(count)
            });


        if (
            !aiResult ||
            !Array.isArray(
                aiResult.questions
            )
        ) {

            return res.status(500).json({

                success: false,

                message:
                    "AI returned invalid question data"
            });
        }


        const insertedQuestions = [];


        // ----------------------------------------------
        // Store questions
        // ----------------------------------------------

        for (
            const question
            of aiResult.questions
        ) {

            if (
                !question.question ||
                !Array.isArray(
                    question.options
                ) ||
                question.options.length !== 4 ||
                !question.correctAnswer
            ) {

                continue;
            }


            const insertResult =
                await pool.query(
                    `
                    INSERT INTO skill_questions
                    (
                        skill_id,

                        level,

                        module_id,

                        question,

                        question_type,

                        options,

                        correct_answer,

                        explanation,

                        generated_by
                    )

                    VALUES
                    (
                        $1,

                        $2,

                        $3,

                        $4,

                        'mcq',

                        $5,

                        $6,

                        $7,

                        'AI'
                    )

                    RETURNING

                        id,

                        skill_id,

                        level,

                        module_id,

                        question,

                        question_type,

                        options,

                        explanation
                    `,
                    [
                        skill.skill_id,

                        skill.current_level,

                        moduleId,

                        question.question,

                        JSON.stringify(
                            question.options
                        ),

                        question.correctAnswer,

                        question.explanation || ""
                    ]
                );


            insertedQuestions.push(
                insertResult.rows[0]
            );
        }


        res.json({

            success: true,

            source: "AI",

            questions:
                insertedQuestions
        });


    } catch (error) {

        console.error(
            "Generate questions error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to generate questions"
        });
    }
};



// ======================================================
// GET QUESTIONS
// ======================================================

const getQuestions = async (
    req,
    res
) => {

    try {

        const studentId =
            req.user.id;


        const {
            studentSkillId,
            moduleId
        } = req.query;


        const skillResult =
            await pool.query(
                `
                SELECT

                    ss.id,

                    ss.skill_id,

                    ss.current_level

                FROM student_skills ss

                WHERE ss.id = $1

                AND ss.student_id = $2
                `,
                [
                    studentSkillId,
                    studentId
                ]
            );


        if (
            skillResult.rows.length === 0
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Unauthorized skill"
            });
        }


        const skill =
            skillResult.rows[0];


        const result =
            await pool.query(
                `
                SELECT

                    id,

                    question,

                    question_type,

                    options,

                    explanation

                FROM skill_questions

                WHERE skill_id = $1

                AND level = $2

                AND module_id = $3

                ORDER BY id DESC

                LIMIT 10
                `,
                [
                    skill.skill_id,

                    skill.current_level,

                    moduleId
                ]
            );


        res.json({

            success: true,

            questions:
                result.rows
        });


    } catch (error) {

        console.error(
            "Get questions error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to get questions"
        });
    }
};



// ======================================================
// SUBMIT ANSWER
// ======================================================

const submitAnswer = async (req, res) => {

    try {

        const studentId = req.user.id;

        const {
            studentSkillId,
            questionId,
            selectedAnswer
        } = req.body;


        // ==================================================
        // VALIDATION
        // ==================================================

        if (
            !studentSkillId ||
            !questionId ||
            selectedAnswer === undefined
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Required fields are missing"
            });
        }


        // ==================================================
        // CHECK STUDENT SKILL
        // ==================================================

        const skillResult =
            await pool.query(
                `
                SELECT

                    id,

                    skill_id,

                    current_level,

                    status

                FROM student_skills

                WHERE id = $1

                AND student_id = $2
                `,
                [
                    studentSkillId,
                    studentId
                ]
            );


        if (
            skillResult.rows.length === 0
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Unauthorized skill"
            });
        }


        const skill =
            skillResult.rows[0];


        // ==================================================
        // GET QUESTION
        // ==================================================

        const questionResult =
            await pool.query(
                `
                SELECT

                    id,

                    module_id,

                    correct_answer

                FROM skill_questions

                WHERE id = $1

                AND skill_id = $2

                AND level = $3
                `,
                [
                    questionId,

                    skill.skill_id,

                    skill.current_level
                ]
            );


        if (
            questionResult.rows.length === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Question not found"
            });
        }


        const question =
            questionResult.rows[0];


        const moduleId =
            question.module_id;


        // ==================================================
        // CHECK ANSWER
        // ==================================================

        const correctAnswer =
            String(
                question.correct_answer
            )
                .trim()
                .toLowerCase();


        const answer =
            String(
                selectedAnswer
            )
                .trim()
                .toLowerCase();


        const isCorrect =
            correctAnswer === answer;


        const score =
            isCorrect ? 1 : 0;


        // ==================================================
        // SAVE ATTEMPT
        // ==================================================

        await pool.query(
            `
            INSERT INTO student_question_attempts
            (
                student_id,

                student_skill_id,

                question_id,

                selected_answer,

                is_correct,

                score
            )

            VALUES
            (
                $1,

                $2,

                $3,

                $4,

                $5,

                $6
            )
            `,
            [
                studentId,

                studentSkillId,

                questionId,

                selectedAnswer,

                isCorrect,

                score
            ]
        );


        // ==================================================
        // GET MODULE QUESTION COUNT
        // ==================================================

        const moduleQuestionResult =
            await pool.query(
                `
                SELECT

                    COUNT(*) AS total_questions

                FROM skill_questions

                WHERE module_id = $1
                `,
                [
                    moduleId
                ]
            );


        const totalQuestions =
            Number(
                moduleQuestionResult.rows[0]
                    .total_questions
            );


        // ==================================================
        // GET ANSWERED QUESTIONS FOR THIS MODULE
        // ==================================================

        const answeredResult =
            await pool.query(
                `
                SELECT

                    COUNT(
                        DISTINCT sqa.question_id
                    ) AS answered_questions,

                    COUNT(
                        DISTINCT CASE
                            WHEN sqa.is_correct = true
                            THEN sqa.question_id
                        END
                    ) AS correct_questions

                FROM student_question_attempts sqa

                JOIN skill_questions sq

                    ON sq.id =
                       sqa.question_id

                WHERE sqa.student_skill_id = $1

                AND sq.module_id = $2
                `,
                [
                    studentSkillId,

                    moduleId
                ]
            );


        const answeredQuestions =
            Number(
                answeredResult.rows[0]
                    .answered_questions
            );


        const correctQuestions =
            Number(
                answeredResult.rows[0]
                    .correct_questions
            );


        // ==================================================
        // MODULE PROGRESS
        // ==================================================

        let moduleProgress = 0;


        if (totalQuestions > 0) {

            moduleProgress =
                Math.round(
                    (
                        answeredQuestions /
                        totalQuestions
                    ) * 100
                );
        }


        // ==================================================
        // CHECK MODULE COMPLETION
        // ==================================================

        const moduleCompleted =
            answeredQuestions >= totalQuestions;
        if (!moduleCompleted) {

            await pool.query(
                `
        INSERT INTO student_module_progress
        (
            student_skill_id,
            module_id,
            current_question,
            score,
            status
        )

        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            'in_progress'
        )

        ON CONFLICT
        (
            student_skill_id,
            module_id
        )

        DO UPDATE SET

            current_question = $3,

            score = $4,

            status = 'in_progress'
        `,
                [
                    studentSkillId,
                    moduleId,
                    answeredQuestions,
                    correctQuestions
                ]
            );

        }
        let nextModule = null;
        // ==================================================
        // MODULE STATUS
        // ==================================================

        if (moduleCompleted) {

            // ----------------------------------------------
            // Mark current module completed
            // ----------------------------------------------

            await pool.query(
                `
                INSERT INTO student_module_progress
                (
                    student_skill_id,
                    module_id,
                    current_question,
                    score,
                    status,
                    completed_at
                )

                VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4,
                    'completed',
                    CURRENT_TIMESTAMP
                )

                ON CONFLICT
                (
                    student_skill_id,
                    module_id
                )

                DO UPDATE SET

                    current_question = $3,

                    score = $4,

                    status = 'completed',

                    completed_at =  CURRENT_TIMESTAMP
                `,
                [
                    studentSkillId,

                    moduleId,

                    totalQuestions,

                    correctQuestions
                ]
            );


            // ==================================================
            // FIND NEXT MODULE
            // ==================================================

            const currentModuleResult =
                await pool.query(
                    `
                    SELECT

                        id,

                        order_number

                    FROM skill_learning_modules

                    WHERE id = $1
                    `,
                    [
                        moduleId
                    ]
                );


            const currentModule = currentModuleResult.rows[0];


            const nextModuleResult =
                await pool.query(
                    `
                          SELECT

            id,

            skill_id,

            level,

            title,

            description,

            order_number

        FROM skill_learning_modules

        WHERE skill_id = $1

        AND level = $2

        AND order_number > $3

        ORDER BY order_number ASC

        LIMIT 1
                    `,
                    [
                        skill.skill_id,

                        skill.current_level,

                        currentModule.order_number
                    ]
                );


            let nextModule = null;


            if (
                nextModuleResult.rows.length > 0
            ) {




                // ------------------------------------------
                // Start next module
                // ------------------------------------------
                nextModule = nextModuleResult.rows[0];

                await pool.query(
                    `INSERT INTO student_module_progress
    (
        student_skill_id,
        module_id,
        current_question,
        score,
        status
    )

    VALUES
    (
        $1,
        $2,
        0,
        0,
        'in_progress'
    )

    ON CONFLICT
    (
        student_skill_id,
        module_id
    )

    DO NOTHING`,
                    [
                        studentSkillId,
                        nextModule.id
                    ]
                );

                const nextModuleProgressResult =
                    await pool.query(
                        `
        SELECT

            slm.id,

            slm.skill_id,

            slm.level,

            slm.title,

            slm.description,

            slm.order_number,

            smp.status,

            smp.current_question,

            smp.score,

            smp.started_at,

            smp.completed_at

        FROM skill_learning_modules slm

        JOIN student_module_progress smp

            ON smp.module_id = slm.id

            AND smp.student_skill_id = $1

        WHERE slm.id = $2
        `,
                        [
                            studentSkillId,
                            nextModule.id
                        ]
                    );

                nextModule = nextModuleProgressResult.rows[0];
            }
        }



        // ==================================================
        // GET OVERALL SKILL PROGRESS
        // ==================================================

        const allModulesResult =
            await pool.query(
                `
                SELECT

                    COUNT(*) AS total_modules,

                    COUNT(*) FILTER (
                        WHERE smp.status = 'completed'
                    ) AS completed_modules

                FROM skill_learning_modules slm

                LEFT JOIN student_module_progress smp

                    ON smp.module_id = slm.id

                    AND smp.student_skill_id = $1

                WHERE slm.skill_id = $2

                AND slm.level = $3
                `,
                [
                    studentSkillId,

                    skill.skill_id,

                    skill.current_level
                ]
            );


        const totalModules =
            Number(
                allModulesResult.rows[0]
                    .total_modules
            );


        const completedModules =
            Number(
                allModulesResult.rows[0]
                    .completed_modules
            );


        let overallProgress = 0;


        if (totalModules > 0) {

            overallProgress =
                Math.round(
                    (
                        completedModules /
                        totalModules
                    ) * 100
                );
        }


        // ==================================================
        // UPDATE CURRENT LEVEL PROGRESS
        // ==================================================

        const levelResult =
            await pool.query(
                `
                SELECT

                    id

                FROM student_skill_levels

                WHERE student_skill_id = $1

                AND level = $2
                `,
                [
                    studentSkillId,

                    skill.current_level
                ]
            );


        if (
            levelResult.rows.length > 0
        ) {

            const levelId =
                levelResult.rows[0].id;


            await pool.query(
                `
                UPDATE student_skill_levels

                SET

                    progress = $1

                WHERE id = $2
                `,
                [
                    overallProgress,

                    levelId
                ]
            );
        }


        // ==================================================
        // RESPONSE
        // ==================================================

        res.json({

            success: true,

            correct: isCorrect,

            score,

            moduleId,

            moduleProgress,

            overallProgress,

            answeredQuestions,

            totalQuestions,

            moduleCompleted,

            nextModule,

            message:
                isCorrect
                    ? "Correct answer"
                    : "Incorrect answer"
        });


    } catch (error) {

        console.error(
            "Submit answer error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to submit answer"
        });
    }
};



// ======================================================
// GET STUDENT SKILL PROGRESS
// ======================================================

const getSkillProgress = async (
    req,
    res
) => {

    try {

        const studentId =
            req.user.id;

        const {
            studentSkillId
        } = req.params;


        const result =
            await pool.query(
                `
                SELECT

                    ssl.id,

                    ssl.level,

                    ssl.progress,

                    ssl.status,

                    ssl.started_at,

                    ssl.completed_at

                FROM student_skill_levels ssl

                JOIN student_skills ss

                    ON ss.id =
                       ssl.student_skill_id

                WHERE ss.id = $1

                AND ss.student_id = $2

                ORDER BY

                    CASE ssl.level

                        WHEN 'Beginner'
                            THEN 1

                        WHEN 'Intermediate'
                            THEN 2

                        WHEN 'Advanced'
                            THEN 3

                        WHEN 'Expert'
                            THEN 4

                    END
                `,
                [
                    studentSkillId,

                    studentId
                ]
            );


        res.json({

            success: true,

            levels:
                result.rows
        });


    } catch (error) {

        console.error(
            "Progress error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to get progress"
        });
    }
};



module.exports = {

    getLearningDetails,

    getModule,

    generateSkillQuestions,

    getQuestions,

    submitAnswer,

    getSkillProgress
};