const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const authorizePermissions = async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new UnauthorizedError("Unauthorized to access this route");
  }
  next();
};

module.exports = {
  authorizePermissions,
};
