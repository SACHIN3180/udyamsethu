const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateQuestions({
    skillName,
    category,
    level,
    moduleTitle,
    moduleDescription,
    count = 5
}) {

    const prompt = `
You are an educational question generator.

Generate ${count} multiple-choice questions for a student learning:

Skill: ${skillName}
Category: ${category}
Level: ${level}
Module: ${moduleTitle}
Module Description: ${moduleDescription || "General learning"}

Requirements:

1. Questions must be appropriate for the ${level} level.
2. Questions must be related to ${skillName}.
3. Each question must have exactly 4 options.
4. Only one option should be correct.
5. Provide a short explanation.
6. Do not create duplicate questions.
7. Do not include questions outside the module topic.
8. Return ONLY valid JSON.

JSON format:

{
    "questions": [
        {
            "question": "Question text",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "correctAnswer": "Option A",
            "explanation": "Explanation"
        }
    ]
}
`;

    const response = await client.responses.create({
        model: "gpt-6-luna",
        input: prompt
    });

    const text = response.output_text;

    return JSON.parse(text);
}

module.exports = {
    generateQuestions
};