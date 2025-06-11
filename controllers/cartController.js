const asyncHandler = require("express-async-handler");
const CartModel = require("../models/Cart");

const CreateCart = asyncHandler(async (req, res) => {
  const { products } = req.body;

  const cart = await CartModel.create({
    user: req.user._id,
    products,
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

  if (!cart) {
    return res.status(404).json({ msg: `No cart with id ${id}` });
  }

  res.status(200).json({ data: cart });
});

const GetUserCart = asyncHandler(async (req, res) => {
  const cart = await CartModel.findOne({ user: req.user._id }).populate("products.productId", "name photo");



  if (!cart) {
    return res.status(404).json({ msg: "No cart found for this user" });
  }

  res.status(200).json({ data: cart });
});

const DeleteCart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cart = await CartModel.findByIdAndDelete(id);

  if (!cart) {
    return res.status(404).json({ msg: `No cart with id ${id}` });
  }

  res.status(200).json({ msg: `Cart with id ${id} deleted` });
});

module.exports = {
  CreateCart,
  UpdateCart,
  GetUserCart,
  DeleteCart,
};
