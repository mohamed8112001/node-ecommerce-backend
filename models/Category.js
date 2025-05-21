const mongoose = require("mongoose");

// 1-create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [20, "Name must be at most 20 characters"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// 2-create model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
