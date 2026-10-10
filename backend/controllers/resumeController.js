const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const {
  extractResumeText,
} = require("../services/resumeFileService");

const {
  generateResume,
  parseUploadedResume,
  analyzeResume,
  improveResume,
} = require("../services/resumeAiService");


// ============================================================
// HELPERS
// ============================================================

const ensureResumeSettings = async (userId) => {

  const result = await pool.query(
    `
    SELECT base_slots, extra_slots
    FROM resume_settings
    WHERE user_id = $1
    `,
    [userId]
  );

  if (result.rows.length > 0) {
    return result.rows[0];
  }

  const inserted = await pool.query(
    `
    INSERT INTO resume_settings
    (
      user_id,
      base_slots,
      extra_slots
    )
    VALUES ($1, 2, 0)
    RETURNING base_slots, extra_slots
    `,
    [userId]
  );

  return inserted.rows[0];
};


const getResumeLimit = async (userId) => {

  const settings = await ensureResumeSettings(userId);

  return (
    Number(settings.base_slots) +
    Number(settings.extra_slots)
  );
};


const checkResumeSlot = async (userId) => {

  const limit = await getResumeLimit(userId);

  const result = await pool.query(
    `
    SELECT COUNT(*)::INTEGER AS count
    FROM resumes
    WHERE user_id = $1
    AND status <> 'archived'
    `,
    [userId]
  );

  const count = result.rows[0].count;

  if (count >= limit) {
    const error = new Error(
      `Resume storage limit reached. You currently have ${limit} resume slot(s).`
    );

    error.statusCode = 409;

    throw error;
  }

  return {
    count,
    limit,
  };
};


// ============================================================
// GET RESUME DASHBOARD
// ============================================================

const getResumeDashboard = async (req, res) => {

  try {

    const userId = req.user.id;

    const settings = await ensureResumeSettings(userId);

    const resumes = await pool.query(
      `
      SELECT
        r.id,
        r.title,
        r.source_type,
        r.status,
        r.ai_score,
        r.is_primary,
        r.original_file_name,
        r.file_type,
        r.file_size,
        r.template_id,
        r.created_at,
        r.updated_at,
        rt.name AS template_name,
        rt.slug AS template_slug
      FROM resumes r
      LEFT JOIN resume_templates rt
        ON rt.id = r.template_id
      WHERE r.user_id = $1
      AND r.status <> 'archived'
      ORDER BY r.updated_at DESC
      `,
      [userId]
    );

    const limit =
      Number(settings.base_slots) +
      Number(settings.extra_slots);

    res.json({
      success: true,
      data: {
        settings: {
          baseSlots: Number(settings.base_slots),
          extraSlots: Number(settings.extra_slots),
          totalSlots: limit,
          usedSlots: resumes.rows.length,
          availableSlots:
            limit - resumes.rows.length,
        },
        resumes: resumes.rows,
      },
    });

  } catch (error) {

    console.error(
      "getResumeDashboard:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load resume dashboard.",
    });
  }
};


// ============================================================
// GET TEMPLATES
// ============================================================

const getTemplates = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        slug,
        description,
        preview_image
      FROM resume_templates
      WHERE is_active = TRUE
      ORDER BY id ASC
      `
    );

    res.json({
      success: true,
      templates: result.rows,
    });

  } catch (error) {

    console.error(
      "getTemplates:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load resume templates.",
    });
  }
};


// ============================================================
// ADD RESUME SLOT
// ============================================================

const addResumeSlot = async (req, res) => {

  try {

    const userId = req.user.id;

    const settings = await ensureResumeSettings(userId);

    const updated = await pool.query(
      `
      UPDATE resume_settings
      SET
        extra_slots = extra_slots + 1,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      RETURNING base_slots, extra_slots
      `,
      [userId]
    );

    const row = updated.rows[0];

    res.json({
      success: true,
      message: "New resume slot added.",
      settings: {
        baseSlots: Number(row.base_slots),
        extraSlots: Number(row.extra_slots),
        totalSlots:
          Number(row.base_slots) +
          Number(row.extra_slots),
      },
    });

  } catch (error) {

    console.error(
      "addResumeSlot:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to add resume slot.",
    });
  }
};


// ============================================================
// GET ONE RESUME
// ============================================================

const getResumeById = async (req, res) => {

  try {

    const userId = req.user.id;

    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        r.*,
        rt.name AS template_name,
        rt.slug AS template_slug
      FROM resumes r
      LEFT JOIN resume_templates rt
        ON rt.id = r.template_id
      WHERE r.id = $1
      AND r.user_id = $2
      `,
      [id, userId]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    res.json({
      success: true,
      resume: result.rows[0],
    });

  } catch (error) {

    console.error(
      "getResumeById:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load resume.",
    });
  }
};


// ============================================================
// CREATE EMPTY RESUME
// ============================================================

const createResume = async (req, res) => {

  try {

    const userId = req.user.id;

    await checkResumeSlot(userId);

    const {
      title,
      templateId,
      content,
      sourceType = "manual",
    } = req.body;

    if (!title) {

      return res.status(400).json({
        success: false,
        message: "Resume title is required.",
      });
    }

    if (
      ![
        "manual",
        "ai_generated",
      ].includes(sourceType)
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid resume source type.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO resumes
      (
        user_id,
        template_id,
        title,
        source_type,
        status,
        content,
        is_primary
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        'draft',
        $5,
        NOT EXISTS (
          SELECT 1
          FROM resumes
          WHERE user_id = $1
          AND status <> 'archived'
        )
      )
      RETURNING *
      `,
      [
        userId,
        templateId || null,
        title,
        sourceType,
        content || {},
      ]
    );

    res.status(201).json({
      success: true,
      message: "Resume created successfully.",
      resume: result.rows[0],
    });

  } catch (error) {

    console.error(
      "createResume:",
      error
    );

    res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.statusCode
          ? error.message
          : "Failed to create resume.",
    });
  }
};


// ============================================================
// UPDATE RESUME
// ============================================================

const updateResume = async (req, res) => {

  try {

    const userId = req.user.id;

    const { id } = req.params;

    const {
      title,
      templateId,
      content,
      status,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE resumes
      SET
        title = COALESCE($1, title),
        template_id = COALESCE($2, template_id),
        content = COALESCE($3::jsonb, content),
        status = COALESCE($4, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      AND user_id = $6
      AND status <> 'archived'
      RETURNING *
      `,
      [
        title || null,
        templateId || null,
        content
          ? JSON.stringify(content)
          : null,
        status || null,
        id,
        userId,
      ]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    res.json({
      success: true,
      message: "Resume updated successfully.",
      resume: result.rows[0],
    });

  } catch (error) {

    console.error(
      "updateResume:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update resume.",
    });
  }
};


// ============================================================
// DELETE / ARCHIVE RESUME
// ============================================================

const deleteResume = async (req, res) => {

  try {

    const userId = req.user.id;

    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE resumes
      SET
        status = 'archived',
        is_primary = FALSE,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      AND user_id = $2
      RETURNING id
      `,
      [id, userId]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    res.json({
      success: true,
      message: "Resume removed successfully.",
    });

  } catch (error) {

    console.error(
      "deleteResume:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to remove resume.",
    });
  }
};


// ============================================================
// GENERATE AI RESUME
// ============================================================

const generateAiResume = async (req, res) => {

  try {

    const userId = req.user.id;

    await checkResumeSlot(userId);

    const {
      title,
      targetRole,
      profile,
      experience,
      skills,
      education,
      projects,
      templateId,
      template,
    } = req.body;

    if (!title) {

      return res.status(400).json({
        success: false,
        message: "Resume title is required.",
      });
    }

    const generatedContent =
      await generateResume({
        profile,
        targetRole,
        experience,
        skills,
        education,
        projects,
        template,
      });

    const result = await pool.query(
      `
      INSERT INTO resumes
      (
        user_id,
        template_id,
        title,
        source_type,
        status,
        content,
        is_primary
      )
      VALUES
      (
        $1,
        $2,
        $3,
        'ai_generated',
        'draft',
        $4,
        NOT EXISTS (
          SELECT 1
          FROM resumes
          WHERE user_id = $1
          AND status <> 'archived'
        )
      )
      RETURNING *
      `,
      [
        userId,
        templateId || null,
        title,
        JSON.stringify(generatedContent),
      ]
    );

    const resume = result.rows[0];

    await pool.query(
      `
      INSERT INTO resume_ai_history
      (
        resume_id,
        action_type,
        input_data,
        output_data
      )
      VALUES
      (
        $1,
        'generate',
        $2,
        $3
      )
      `,
      [
        resume.id,
        JSON.stringify({
          targetRole,
          template,
        }),
        JSON.stringify(generatedContent),
      ]
    );

    res.status(201).json({
      success: true,
      message: "AI resume generated successfully.",
      resume,
    });

  } catch (error) {

    console.error(
      "generateAiResume:",
      error
    );

    res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.statusCode
          ? error.message
          : "Failed to generate AI resume.",
    });
  }
};


// ============================================================
// UPLOAD RESUME
// ============================================================

const uploadResume = async (req, res) => {

  try {

    const userId = req.user.id;

    await checkResumeSlot(userId);

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    const file = req.file;

    const extension =
      path.extname(file.originalname)
        .toLowerCase();

    const extractedText =
      await extractResumeText(
        file.path,
        file.mimetype,
        extension
      );

    let content = {
      personal: {},
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
    };

    // AI structure extraction
    if (extractedText.trim()) {

      try {

        content =
          await parseUploadedResume(
            extractedText
          );

      } catch (aiError) {

        console.error(
          "Resume parsing AI error:",
          aiError
        );
      }
    }

    const result = await pool.query(
      `
      INSERT INTO resumes
      (
        user_id,
        title,
        source_type,
        status,
        content,
        original_file_name,
        stored_file_name,
        file_path,
        file_type,
        file_size,
        extracted_text,
        is_primary
      )
      VALUES
      (
        $1,
        $2,
        'uploaded',
        'draft',
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        NOT EXISTS (
          SELECT 1
          FROM resumes
          WHERE user_id = $1
          AND status <> 'archived'
        )
      )
      RETURNING *
      `,
      [
        userId,
        path.basename(
          file.originalname,
          extension
        ),
        JSON.stringify(content),
        file.originalname,
        file.filename,
        file.path,
        extension.replace(".", ""),
        file.size,
        extractedText,
      ]
    );

    res.status(201).json({
      success: true,
      message:
        "Resume uploaded successfully.",
      resume: result.rows[0],
    });

    // } catch (error) {

    //   console.error(
    //     "uploadResume:",
    //     error
    //   );

    //   if (req.file?.path) {

    //     try {
    //       fs.unlinkSync(req.file.path);
    //     } catch (deleteError) {
    //       console.error(deleteError);
    //     }
    //   }

    //   res.status(
    //     error.statusCode || 500
    //   ).json({
    //     success: false,
    //     message:
    //       error.statusCode
    //         ? error.message
    //         : "Failed to upload resume.",
    //   });
    } 
    catch (error) {
    console.error("uploadResume FULL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload resume.",
    });
  }
};


// ============================================================
// ANALYZE RESUME
// ============================================================

const analyzeResumeController = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;

    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM resumes
      WHERE id = $1
      AND user_id = $2
      `,
      [id, userId]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    const resume = result.rows[0];

    const analysis =
      await analyzeResume(
        resume.content
      );

    await pool.query(
      `
      UPDATE resumes
      SET
        ai_score = $1,
        ai_feedback = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      AND user_id = $4
      `,
      [
        analysis.score,
        JSON.stringify(analysis),
        id,
        userId,
      ]
    );

    await pool.query(
      `
      INSERT INTO resume_ai_history
      (
        resume_id,
        action_type,
        input_data,
        output_data,
        score
      )
      VALUES
      (
        $1,
        'analyze',
        $2,
        $3,
        $4
      )
      `,
      [
        id,
        JSON.stringify(resume.content),
        JSON.stringify(analysis),
        analysis.score,
      ]
    );

    res.json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.error(
      "analyzeResume:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to analyze resume.",
    });
  }
};


// ============================================================
// IMPROVE RESUME
// ============================================================

const improveResumeController = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;

    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM resumes
      WHERE id = $1
      AND user_id = $2
      `,
      [id, userId]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    const resume = result.rows[0];

    const improved =
      await improveResume(
        resume.content
      );

    await pool.query(
      `
      UPDATE resumes
      SET
        content = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      AND user_id = $3
      `,
      [
        JSON.stringify(improved),
        id,
        userId,
      ]
    );

    await pool.query(
      `
      INSERT INTO resume_ai_history
      (
        resume_id,
        action_type,
        input_data,
        output_data
      )
      VALUES
      (
        $1,
        'improve',
        $2,
        $3
      )
      `,
      [
        id,
        JSON.stringify(resume.content),
        JSON.stringify(improved),
      ]
    );

    res.json({
      success: true,
      message:
        "Resume improved successfully.",
      content: improved,
    });

  } catch (error) {

    console.error(
      "improveResume:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to improve resume.",
    });
  }
};


// ============================================================
// EXPORT
// ============================================================

module.exports = {
  getResumeDashboard,
  getTemplates,
  addResumeSlot,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  generateAiResume,
  uploadResume,
  analyzeResumeController,
  improveResumeController,
};