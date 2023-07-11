const { StatusCodes } = require("http-status-codes");
const { isTokenValid } = require("../utils/");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication failed");
  }
};

module.exports = {
  authenticateUser,
};
