const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {

    getLearningDetails,

    getModule,

    generateSkillQuestions,

    getQuestions,

    submitAnswer,

    getSkillProgress

} = require("../controllers/skillsLearningController");


// Get complete learning page
router.get(
    "/:studentSkillId",
    authMiddleware,
    getLearningDetails
);


// Get one module
router.get(
    "/:studentSkillId/module/:moduleId",
    authMiddleware,
    getModule
);


// Generate AI questions
router.post(
    "/generate-questions",
    authMiddleware,
    generateSkillQuestions
);


// Get questions
router.get(
    "/questions",
    authMiddleware,
    getQuestions
);


// Submit answer
router.post(
    "/answer",
    authMiddleware,
    submitAnswer
);


// Get level progress
router.get(
    "/:studentSkillId/progress",
    authMiddleware,
    getSkillProgress
);


module.exports = router;