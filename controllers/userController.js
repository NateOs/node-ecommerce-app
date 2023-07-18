const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

// get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ hits: users.length, users });
};

// get a user by id
const getSingleUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) {
    throw new NotFoundError("User not found with id: " + id);
  }
  res.status(StatusCodes.OK).json({
    user,
  });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).send("update user");
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Provide old and new password");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("Password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "password update completed successfully" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
