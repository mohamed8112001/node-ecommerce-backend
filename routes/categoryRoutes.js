const express = require("express");
const router = express.Router();

const {
  CreateCategory,
  GetCategories,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
} = require("../controllers/categoryController");

router.post("/", CreateCategory);
router.get("/", GetCategories);
router.get("/:id", GetCategory);
router.put("/:id", UpdateCategory);
router.delete("/:id", DeleteCategory);

module.exports = router;
