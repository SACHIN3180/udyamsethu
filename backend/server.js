const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const skillsLearningRoutes = require("./routes/skillsLearningRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const reviewerRoutes = require("./routes/reviewerRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes")
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Udyam Sethu Backend API  is running",
    })
});

// Database Test

app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "PostgreSQL connected successfully",
            time: result.rows[0].now
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        })

    }
})

// Authentication Routes

app.use("/api/auth", authRoutes);

//Skills ROutes
app.use("/api/skills", skillsRoutes);

// Skills Learning Routes
app.use("/api/skills-learning", skillsLearningRoutes);

//  Reviewer Routes
app.use("/api/reviewer", reviewerRoutes);

//Student Profile
app.use("/api/student", studentProfileRoutes)

//Resume
app.use("/api/resumes", resumeRoutes);

//Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

})