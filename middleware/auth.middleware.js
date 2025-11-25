import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  try {
    let token;

    // 1️⃣ Token from cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2️⃣ OR Token from Authorization Header (optional)
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user data in request
    req.user = decoded;

    next(); // Move to next middleware/route
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: error.message,
    });
  }
};
