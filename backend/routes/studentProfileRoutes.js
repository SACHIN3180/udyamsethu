const express = require("express");

const router = express.Router();

const {
    getStudentProfile,
    updateStudentProfile
} = require("../controllers/studentProfileController");

const authMiddleware = require("../middleware/authMiddleware");


router.get(
    "/profile",
    authMiddleware,
    getStudentProfile
);


router.put(
    "/profile",
    authMiddleware,
    updateStudentProfile
);


module.exports = router;