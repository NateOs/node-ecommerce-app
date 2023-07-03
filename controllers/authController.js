const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { createJWT } = require("../utils");
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
  const { email, password, name } = req.body;

  // first user created is admin
  let isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  let existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new BadRequestError("Email already exists");
  }

  const user = await User.create({ email, password, name, role });

  const tokenUser = { userId: user._id, name: user.name };

  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.CREATED).send({
    user: {
      userId: user._id,
      name: user.name,
      role: user.role,
    },
    token: token,
  });
};

module.exports = { register, login, logout };
