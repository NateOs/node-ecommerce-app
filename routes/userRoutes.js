const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const { authorizePermissions } = require("../middleware/authorizePermissions");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin",), getAllUsers);
router.route("/updateUser").post(updateUser);
router.route("/showMe").get(showCurrentUser);
router.route("/updateUserPassword").get(updateUserPassword);
router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
