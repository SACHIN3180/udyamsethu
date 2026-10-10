const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const reviewerMiddleware =
    require("../middleware/reviewerMiddleware");

const {
    approveSkillLevel,
    getPendingReviews
} = require("../controllers/reviewerController");

router.get(
    "/pending",
    authMiddleware,
    reviewerMiddleware,
    getPendingReviews
);

router.post(
    "/approve-level",
    authMiddleware,
    reviewerMiddleware,
    approveSkillLevel
);


module.exports = router;