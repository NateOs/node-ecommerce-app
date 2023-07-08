const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const getAllUsers = async (req, res) => {
  res.status(StatusCodes.OK).send("All users found");
};
const getSingleUser = async (req, res) => {
  res.status(StatusCodes.OK).send("Get single user");
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
