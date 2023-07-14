const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("User is not authorized to view this page");
    }
    next();
  };
};

module.exports = {
  authorizePermissions,
};
