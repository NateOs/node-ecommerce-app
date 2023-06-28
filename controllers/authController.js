const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const logout = async (req, res, next) => {
  console.log("logout user");
  res.send("logout route");
};

const login = async (req, res, next) => {
  console.log("login user");
  res.send("login route");
};

const register = async (req, res, next) => {
  const { email } = req.body;
  const existingEmail = User.findOne({ email: email });

  if (existingEmail) {
    throw new BadRequestError("Email already exists");
  }
  
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).send(user);
};

module.exports = { register, login, logout };
