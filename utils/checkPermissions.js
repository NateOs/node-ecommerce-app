const { UnauthorizedError } = require("../errors");

// requestUser is the authenticated user, resourceUser is the user returned from the db
// this check is to prevent a user from viewing another users profile
const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  if (requestUser.role === "admin") return;
  throw new UnauthorizedError("You don't have access to this resource");
};
module.exports = checkPermissions;
