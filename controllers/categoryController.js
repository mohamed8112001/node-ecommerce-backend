const CategoryModel = require("../models/Category");
const asyncHandler = require("express-async-handler");

var slugify = require("slugify");

// Create Category ==> get method
const CreateCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await CategoryModel.create({
    name,
    slug: slugify(name),
  });

  res.status(201).json({ data: category });
});

//  Get All Category  ==> post method
const GetCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; // mean skip if the first page (1-1) * 5 = 0
  // that mean dont skip any item in first page
  const categories = await CategoryModel.find().skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});

// Get Category ==> get by id
const GetCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(201).json({ data: category });
});

// Update Category
const UpdateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },

    // mean send the new category after update not the acient
    { new: true }
  );
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(201).json({ data: category });
});

const DeleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    return res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(200).json({ msg: `Done Delete category for this id ${id}` });
});

module.exports = {
  CreateCategory,
  GetCategories,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
};
