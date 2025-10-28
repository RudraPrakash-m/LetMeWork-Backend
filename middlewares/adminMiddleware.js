const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_STRING);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = adminMiddleware;
