const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const {
  uploadDirectory,
} = require("../services/resumeFileService");

const {
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
} = require("../controllers/resumeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ============================================================
// MULTER
// ============================================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {

    const extension =
      path.extname(file.originalname);

    const filename =
      `${Date.now()}-${crypto
        .randomBytes(8)
        .toString("hex")}${extension}`;

    cb(null, filename);
  },
});


const upload = multer({

  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {

    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx",
    ];

    const extension =
      path.extname(
        file.originalname
      ).toLowerCase();

    if (
      !allowedExtensions.includes(
        extension
      )
    ) {
      return cb(
        new Error(
          "Only PDF, DOC and DOCX files are allowed."
        )
      );
    }

    cb(null, true);
  },
});


// ============================================================
// DASHBOARD
// ============================================================

router.get(
  "/",
  authMiddleware,
  getResumeDashboard
);


// ============================================================
// TEMPLATES
// ============================================================

router.get(
  "/templates",
  authMiddleware,
  getTemplates
);


// ============================================================
// ADD SLOT
// ============================================================

router.post(
  "/slots",
  authMiddleware,
  addResumeSlot
);


// ============================================================
// CREATE MANUAL RESUME
// ============================================================

router.post(
  "/",
  authMiddleware,
  createResume
);


// ============================================================
// AI GENERATE
// ============================================================

router.post(
  "/generate",
  authMiddleware,
  generateAiResume
);


// ============================================================
// UPLOAD EXISTING RESUME
// ============================================================

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);


// ============================================================
// GET ONE
// ============================================================

router.get(
  "/:id",
  authMiddleware,
  getResumeById
);


// ============================================================
// UPDATE
// ============================================================

router.put(
  "/:id",
  authMiddleware,
  updateResume
);


// ============================================================
// DELETE
// ============================================================

router.delete(
  "/:id",
  authMiddleware,
  deleteResume
);


// ============================================================
// AI ANALYZE
// ============================================================

router.post(
  "/:id/analyze",
  authMiddleware,
  analyzeResumeController
);


// ============================================================
// AI IMPROVE
// ============================================================

router.post(
  "/:id/improve",
  authMiddleware,
  improveResumeController
);


module.exports = router;