const express = require("express");
const router = express.Router();

const {
  CreateOrder,
  GetOrders,
  GetOrder,
  DeleteOrder,
} = require("../controllers/orderController");
const protect = require("../middlewares/authMiddleware");

router.post("/", protect, CreateOrder);
router.get("/", protect, GetOrders);
router.get("/:id", protect, GetOrder);
router.delete("/:id", protect, DeleteOrder);

module.exports = router;
