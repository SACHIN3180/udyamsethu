const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getDashboardStats,
    getApprovals,
    handleApprovalAction,
    getStudents,
    createStudent,
    updateStudent,
    updateStudentStatus,
    deleteStudent,
    getEmployers,
    updateEmployer,
    updateEmployerStatus,
    deleteEmployer,
    getInstitutions,
    updateInstitution,
    updateInstitutionStatus,
    deleteInstitution,
    getOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getAuditLogs
} = require("../controllers/adminController");

// All admin routes require admin token authentication
router.use(adminMiddleware);

// 1. Dashboard & Stats
router.get("/stats", getDashboardStats);

// 2. Approvals Management (Approving/Rejecting employer & institution registrations)
router.get("/approvals", getApprovals);
router.post("/approvals/:type/:id/action", handleApprovalAction);

// 3. Student Management
router.get("/students", getStudents);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.patch("/students/:id/status", updateStudentStatus);
router.delete("/students/:id", deleteStudent);

// 4. Employer Management
router.get("/employers", getEmployers);
router.put("/employers/:id", updateEmployer);
router.patch("/employers/:id/status", updateEmployerStatus);
router.delete("/employers/:id", deleteEmployer);

// 5. Institution Management
router.get("/institutions", getInstitutions);
router.put("/institutions/:id", updateInstitution);
router.patch("/institutions/:id/status", updateInstitutionStatus);
router.delete("/institutions/:id", deleteInstitution);

// 6. Opportunities / Gigs Control
router.get("/opportunities", getOpportunities);
router.post("/opportunities", createOpportunity);
router.put("/opportunities/:id", updateOpportunity);
router.delete("/opportunities/:id", deleteOpportunity);

// 7. Audit Logs
router.get("/logs", getAuditLogs);

module.exports = router;
