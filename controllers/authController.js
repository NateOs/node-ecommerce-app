const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse, createTokenUser } = require("../utils");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

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

  const tokenUser = createTokenUser(user);

  //  creating jwt combined with cookies setting
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).send({
    user: {
      name: user.name,
      userId: user._id,
      role: user.role,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email or password is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const tokenUser = createTokenUser(user);

  //  creating jwt combined with cookies setting
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = async (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).send("Logged out");
};

module.exports = { register, login, logout };
