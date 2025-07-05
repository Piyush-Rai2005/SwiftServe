import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ensure decoded token has the expected structure
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
    req.userId = decoded.id;  // ✅ Correctly set userId on req
    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleware;
