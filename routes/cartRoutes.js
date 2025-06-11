const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  CreateCart,
  UpdateCart,
  GetUserCart,
  DeleteCart,
} = require("../controllers/cartController");
const authCart = require("../middlewares/cartMiddleware");

router.post("/", protect, CreateCart);
router.get("/", protect, CreateCart);
router.get("/:id", protect, GetUserCart);
router.put("/:id", protect, authCart, UpdateCart);
router.delete("/:id", protect, authCart, DeleteCart);

module.exports = router;
