const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    signup,
    employerSignup,
    institutionSignup,
    login,
    adminLogin,
    getMe,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

// Student Registration
router.post("/signup", signup);

// Employer Registration (Submits request for admin approval)
router.post("/employer/register", employerSignup);
router.post("/employer-register", employerSignup);

// Institution Registration (Submits request for admin approval)
router.post("/institution/register", institutionSignup);
router.post("/institution-register", institutionSignup);

// Unified Login (Validates credentials and approval status)
router.post("/login", login);

// Role-specific login aliases for convenience
router.post("/employer/login", login);
router.post("/institution/login", login);

// Admin Login
router.post("/admin/login", adminLogin);

// Current User Profile
router.get("/me", authMiddleware, getMe);

// Forgot / Reset Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;