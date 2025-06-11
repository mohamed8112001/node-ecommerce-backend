// middlewares/roleMiddleware.js
const authRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(401).json({ message: "Not authorized" });
      }
      next();
    };
  };
  
  module.exports = authRole;
  

  