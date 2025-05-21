// cartMiddleware.js
const asyncHandler = require("express-async-handler");
const CartModel = require("../models/Cart");

const authCart = asyncHandler(async (req, res, next) => {
  const cartId = req.params.id;
  const cart = await CartModel.findById(cartId);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  if (cart.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }
  next();
});

module.exports = authCart;  
