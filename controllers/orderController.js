const orderSchema = require("../models/Order");
const asyncHandler = require("express-async-handler");

exports.CreateOrder = asyncHandler(async (req, res) => {
  const { userId, products, paymentMethod } = req.body;
  const order = await orderSchema.create({
    userId: req.user._id,
    products,
    paymentMethod,
  });
  res.status(201).json({ data: order });
});

exports.GetOrders = asyncHandler(async (req, res) => {
  const orders = await orderSchema.find();
  res.status(200).json({ result: orders.length, data: orders });
});

exports.GetOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await orderSchema.findById(id);
  if (!order) {
    return res.status(404).json({ msg: `No order for this id ${id}` });
  }
  res.status(200).json({ data: order });
});

// exports.UpdateOrder = asyncHandler(async (req.res)=>{
//     const { id } = req.params;
//     const
// })

exports.DeleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await orderSchema.findByIdAndDelete(id);
  if (!order) {
    return res.status(404).json({ msg: `No order for this id ${id}` });
  }
  res.status(200).json({ msg: `Done Delete order for this id ${id}` });
});
