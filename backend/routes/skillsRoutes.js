const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getSkillCatalog,
    getStudentSkills,
    addSkill,
    removeSkill,
    getSkillStats
} = require("../controllers/skillsController");


// =====================================================
// SKILL CATALOG
// =====================================================

// All available skills
router.get(
    "/catalog",
    authMiddleware,
    getSkillCatalog
);


// =====================================================
// STUDENT SKILLS
// =====================================================

// Get student's selected skills
router.get(
    "/",
    authMiddleware,
    getStudentSkills
);


// Add a skill
router.post(
    "/",
    authMiddleware,
    addSkill
);


// Remove selected skill
router.delete(
    "/:studentSkillId",
    authMiddleware,
    removeSkill
);


// Student skill statistics
router.get(
    "/stats",
    authMiddleware,
    getSkillStats
);


module.exports = router;