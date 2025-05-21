const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const authRole = require("../middlewares/roleMiddleware");
const {
  CreateProduct,
  GetProducts,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/productController");

// Example route
router.post("/", protect, authRole("admin", "seller"), CreateProduct);
router.get("/", GetProducts);
router.get("/:id", GetProduct);
router.put("/:id", protect, UpdateProduct);
router.delete("/:id", protect, authRole("admin"), DeleteProduct);

module.exports = router;
