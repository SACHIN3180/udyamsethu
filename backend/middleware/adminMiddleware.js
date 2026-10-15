const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token required"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization token format"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access forbidden: Administrator privileges required"
            });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.error("Admin middleware error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired administrator token"
        });
    }
};

module.exports = adminMiddleware;
