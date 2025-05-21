// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user without the password field
      req.user = await User.findById(decoded.id).select("-password");

      return next(); // important to stop further execution
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // No token found
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = protect;
