const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL =
  process.env.OPENAI_MODEL || "gpt-6-luna";


const safeJsonParse = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    const cleaned = text
      .replace(/^```json/i, "")
      .replace(/^```/i, "")
      .replace(/```$/i, "")
      .trim();

    return JSON.parse(cleaned);
  }
};


// ============================================================
// GENERATE RESUME
// ============================================================

const generateResume = async ({
  profile,
  targetRole,
  experience,
  skills,
  education,
  projects,
  template,
}) => {

  const prompt = `
You are an expert professional resume writer.

Create a professional resume for a student/job seeker.

IMPORTANT:
- Do not invent employers, degrees, companies, dates or achievements.
- Only improve wording using the information supplied.
- Keep the resume ATS friendly.
- Use professional language.
- Generate measurable language only when supported by the input.
- Return ONLY valid JSON.
- Do not return markdown.

Candidate:
${JSON.stringify(profile)}

Target Role:
${targetRole || ""}

Experience:
${JSON.stringify(experience || [])}

Skills:
${JSON.stringify(skills || [])}

Education:
${JSON.stringify(education || [])}

Projects:
${JSON.stringify(projects || [])}

Template:
${template || "modern"}

Return this structure:

{
  "personal": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "role": "",
    "summary": ""
  },
  "experience": [
    {
      "role": "",
      "company": "",
      "duration": "",
      "description": "",
      "achievements": []
    }
  ],
  "education": [
    {
      "degree": "",
      "college": "",
      "year": ""
    }
  ],
  "skills": [],
  "projects": [
    {
      "name": "",
      "description": "",
      "tech": ""
    }
  ],
  "certifications": [],
  "languages": []
}
`;

  const response = await client.responses.create({
    model: MODEL,
    input: prompt,
  });

  return safeJsonParse(response.output_text);
};


// ============================================================
// CONVERT UPLOADED RESUME TO EDITABLE STRUCTURE
// ============================================================

const parseUploadedResume = async (resumeText) => {

  const prompt = `
You are a resume parser.

Convert the following existing resume text into structured editable JSON.

IMPORTANT:
- Do not invent information.
- Preserve the candidate's information.
- If something is missing, use an empty string or empty array.
- Return ONLY JSON.

Resume:

${resumeText}

Return:

{
  "personal": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "role": "",
    "summary": ""
  },
  "experience": [],
  "education": [],
  "skills": [],
  "projects": [],
  "certifications": [],
  "languages": []
}
`;

  const response = await client.responses.create({
    model: MODEL,
    input: prompt,
  });

  return safeJsonParse(response.output_text);
};


// ============================================================
// ANALYZE RESUME
// ============================================================

const analyzeResume = async (resumeContent) => {

  const prompt = `
You are an ATS resume reviewer.

Analyze this resume.

Do not invent facts.

Return ONLY JSON:

{
  "score": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missing_keywords": [],
  "grammar_issues": [],
  "ats_issues": [],
  "section_feedback": {
    "summary": "",
    "experience": "",
    "education": "",
    "skills": "",
    "projects": ""
  },
  "recommendations": []
}

Resume:

${JSON.stringify(resumeContent)}
`;

  const response = await client.responses.create({
    model: MODEL,
    input: prompt,
  });

  return safeJsonParse(response.output_text);
};


// ============================================================
// IMPROVE RESUME
// ============================================================

const improveResume = async (resumeContent) => {

  const prompt = `
Improve the following resume.

Rules:
- Do not invent experience.
- Do not invent companies.
- Do not invent degrees.
- Do not invent technologies.
- Improve grammar.
- Improve professional wording.
- Improve ATS keyword usage using existing information.
- Make descriptions concise.
- Return ONLY JSON.

Current Resume:

${JSON.stringify(resumeContent)}
`;

  const response = await client.responses.create({
    model: MODEL,
    input: prompt,
  });

  return safeJsonParse(response.output_text);
};


module.exports = {
  generateResume,
  parseUploadedResume,
  analyzeResume,
  improveResume,
};