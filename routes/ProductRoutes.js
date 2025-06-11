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
  GetMyProducts,
  search
} = require("../controllers/productController");

// Example route
router.post("/", protect, authRole("admin", "seller"), CreateProduct);
router.get("/search", search);
router.get("/", GetProducts);
router.get("/:id", GetProduct);
router.post("/", CreateProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", authRole("admin"), DeleteProduct);
module.exports = router;
