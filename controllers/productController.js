const asyncHandler = require("express-async-handler");

var slugify = require("slugify");
const ProductModel = require("../models/Product");

exports.CreateProduct = asyncHandler(
  asyncHandler(async (req, res) => {
    const { name, description, photo } = req.body;
    const product = await ProductModel.create({
      seller: req.user._id,
      name,
      description,
      photo,
    });

    res.status(201).json({ data: product });
  })
);

exports.GetProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find().skip(skip).limit(limit);
  res.status(200).json({ result: products.length, page, data: products });
});

exports.GetProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    res.status(404).json({ msg: `No product for this id ${id}` });
  }
  res.status(201).json({ data: product });
});

exports.UpdateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, photo } = req.body;
  const product = await ProductModel.findByIdAndUpdate(
    id,
    { name, description, photo },
    { new: true }
  );
  if (!product) {
    res.status(404).json({ msg: `No product for this id ${id}` });
  }
  res.status(201).json({ data: product });
});

exports.DeleteProduct = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if(!product){
        return res.status(404).json({msg:`No product for this id ${id}`});
    }
    res.status(200).json({msg:`Done Delete product for this id ${id}`})
})