const reviewerMiddleware = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    if (
        req.user.role !== "reviewer" &&
        req.user.role !== "admin"
    ) {
        return res.status(403).json({
            success: false,
            message: "Reviewer or admin access required"
        });
    }

    next();
};

module.exports = reviewerMiddleware;