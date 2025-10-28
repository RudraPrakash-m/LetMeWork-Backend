const jwt = require("jsonwebtoken");

const verifyRole = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const token =
        req.cookies?.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed: No token provided",
        });
      }

      const decoded = jwt.verify(token, process.env.SECRET_STRING);

      // Role check
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
  };
};

module.exports = verifyRole;
