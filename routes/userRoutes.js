const express = require("express");
const router = express.Router();

const {
  Register,
  Login,
  UpdateUser,
  DeleteUser,
  GetUser,
  GetUsers,
} = require("../controllers/userController");

router.post("/register", Register);
router.post("/login", Login);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);
router.get("/:id", GetUser);
router.get("/", GetUsers);

module.exports = router;
