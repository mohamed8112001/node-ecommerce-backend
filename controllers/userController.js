const asyncHandler = require("express-async-handler");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");


// create token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", 
  });
};

exports.Register = asyncHandler(async (req, res) => {
  const { name, email, password ,role } = req.body;

  const user = await UserModel.create({ name, email, password ,role});

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
    token: generateToken(user._id), // إرسال التوكن
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isSeller: user.isSeller,
    },
  });
});

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

exports.GetUsers = asyncHandler(async(req,res)=>{
  const users = await UserModel.find()
  res.status(200).json({data:users})
})