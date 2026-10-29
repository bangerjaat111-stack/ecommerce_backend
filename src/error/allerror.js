export const errorhandling = (err, req, res, next) => {
    if (err.name === "ValidationError") return res.status(400).json({ status: "failed", message: err.message });
    if (err.name === "CastError") return res.status(400).json({ status: "failed", message: "Invalid ID format" });
    if (err.code === 11000) return res.status(409).json({ status: "failed", message: "Duplicate field value" });
    if (err.name === "JsonWebTokenError") return res.status(401).json({ status: "failed", message: "Invalid token" });
    if (err.name === "TokenExpiredError") return res.status(401).json({ status: "failed", message: "Token expired" });
    if (err.name === "UnauthorizedError") return res.status(401).json({ status: "failed", message: "Unauthorized access" });
    if (err.status === 400 || err.statusCode === 400) return res.status(400).json({ status: "failed", message: err.message || "Bad request" });
    if (err.status === 401 || err.statusCode === 401) return res.status(401).json({ status: "failed", message: err.message || "Unauthorized" });
    if (err.status === 403 || err.statusCode === 403) return res.status(403).json({ status: "failed", message: err.message || "Forbidden" });
    if (err.status === 404 || err.statusCode === 404) return res.status(404).json({ status: "failed", message: err.message || "Resource not found" });
    if (err.status === 409 || err.statusCode === 409) return res.status(409).json({ status: "failed", message: err.message || "Conflict" });
    if (err.type === "entity.too.large") return res.status(413).json({ status: "failed", message: "Request payload too large" });
    if (err.type === "entity.parse.failed") return res.status(400).json({ status: "failed", message: "Invalid JSON payload" });
    if (err.status === 429 || err.statusCode === 429) return res.status(429).json({ status: "failed", message: err.message || "Too many requests" });
    if (err.code === "ECONNREFUSED" || err.code === "ETIMEDOUT") return res.status(503).json({ status: "failed", message: "Service temporarily unavailable" });
    console.error(err);
    return res.status(500).json({ status: "failed", message: "Internal server error" });
};