const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
module.exports = {
  CustomAPIError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError
};
