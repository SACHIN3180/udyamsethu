const pool = require("../config/db");

const seedLearningModules = async () => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const skillsResult = await client.query(`
            SELECT id, name, category
            FROM skill_catalog
            ORDER BY id
        `);

        const moduleTemplates = {
            Beginner: [
                {
                    title: "Fundamentals",
                    description: "Learn the basic concepts and terminology."
                },
                {
                    title: "Core Concepts",
                    description: "Understand the important concepts and fundamental building blocks."
                },
                {
                    title: "Practical Basics",
                    description: "Apply the basic concepts through practical examples and exercises."
                },
                {
                    title: "Beginner Assessment",
                    description: "Test your understanding of the beginner-level concepts."
                }
            ],

            Intermediate: [
                {
                    title: "Intermediate Concepts",
                    description: "Learn important intermediate concepts and techniques."
                },
                {
                    title: "Practical Development",
                    description: "Apply intermediate concepts to practical problems."
                },
                {
                    title: "Problem Solving",
                    description: "Practice solving real-world problems using this skill."
                },
                {
                    title: "Intermediate Assessment",
                    description: "Test your understanding of intermediate concepts."
                }
            ],

            Advanced: [
                {
                    title: "Advanced Concepts",
                    description: "Explore advanced concepts and techniques."
                },
                {
                    title: "Advanced Implementation",
                    description: "Build solutions using advanced concepts."
                },
                {
                    title: "Real World Problems",
                    description: "Solve complex real-world problems using this skill."
                },
                {
                    title: "Advanced Assessment",
                    description: "Test your advanced-level knowledge."
                }
            ],

            Expert: [
                {
                    title: "Expert Concepts",
                    description: "Explore expert-level concepts and architecture."
                },
                {
                    title: "Advanced Problem Solving",
                    description: "Solve complex technical problems."
                },
                {
                    title: "Real World Architecture",
                    description: "Apply expert knowledge to real-world scenarios."
                },
                {
                    title: "Expert Assessment",
                    description: "Evaluate expert-level understanding."
                }
            ]
        };

        for (const skill of skillsResult.rows) {

            for (const level of Object.keys(moduleTemplates)) {

                const modules = moduleTemplates[level];

                for (let i = 0; i < modules.length; i++) {

                    const module = modules[i];

                    const existing = await client.query(
                        `
                        SELECT id
                        FROM skill_learning_modules
                        WHERE skill_id = $1
                        AND level = $2
                        AND order_number = $3
                        `,
                        [
                            skill.id,
                            level,
                            i + 1
                        ]
                    );

                    if (existing.rows.length > 0) {
                        continue;
                    }

                    await client.query(
                        `
                        INSERT INTO skill_learning_modules
                        (
                            skill_id,
                            level,
                            title,
                            description,
                            order_number
                        )
                        VALUES ($1, $2, $3, $4, $5)
                        `,
                        [
                            skill.id,
                            level,
                            `${skill.name} - ${module.title}`,
                            module.description,
                            i + 1
                        ]
                    );
                }
            }
        }

        await client.query("COMMIT");

        console.log(
            "Learning modules created successfully for all skills."
        );

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(
            "Learning module seed error:",
            error
        );

    } finally {

        client.release();

        await pool.end();
    }
};

seedLearningModules();