const asyncHandler = require("express-async-handler");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

// create token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.Register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await UserModel.create({ name, email, password, role });

  res.status(201).json({ data: user });
});

exports.Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid password" });
  }

  res.status(200).json({
    msg: "Login successful",
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isSeller: user.isSeller,
    },
  });
});

// Forget password
exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

const token = crypto.randomBytes(20).toString("hex");
user.resetPasswordToken = token;
user.resetPasswordExpires = Date.now() + 3600000;
await user.save();


  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    text: `To reset your password, click the following link: ${resetLink}`,
  });
  // Send email here (you can add nodemailer)
  res.status(200).json({ message: "Reset token sent", token: resetToken });
});

// Reset password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }


    user.password = newPassword; 
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    
console.error("Reset Password Error:", error.message, error.stack);
    res.status(500).json({ message: "Server error" });
  }
};

exports.UpdateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { name, email, password },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User updated successfully", user });
});

exports.DeleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ msg: `No user for this id ${id}` });
  }
  res.status(200).json({ msg: `Done Delete user for this id ${id}` });
});

exports.GetUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ msg: `No user for this id ${id}` });
  }
  res.status(200).json({ data: user });
});

exports.GetUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json({ data: users });
});
