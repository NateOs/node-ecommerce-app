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
  res.status(StatusCodes.OK).send("show currrent user");
};
const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).send("update user");
};
const updateUserPassword = async (req, res) => {
  res.status(StatusCodes.OK).send("Update user pwd");
};

// getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
