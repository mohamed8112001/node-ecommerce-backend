const asyncHandler = require("express-async-handler");
const CartModel = require("../models/Cart");

const CreateCart = asyncHandler(async (req, res) => {
  const { products } = req.body;

  const cart = await CartModel.create({
    user: req.user._id,
    products
  });

  res.status(201).json({ data: cart });
});


const UpdateCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  const cart = await CartModel.findByIdAndUpdate(
    id,
    { products },
    { new: true }
  );

  res.status(200).json({ data: cart });
});

module.exports = { CreateCart, UpdateCart };
