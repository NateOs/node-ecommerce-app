const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

// accessible to all
router.route("/getAllProducts").get(getAllProducts);
router.route("/getSingleProduct").get(getSingleProduct);

// router.route("/updateUser").patch(authenticateUser, updateUser);
// router.route("/showMe").get(authenticateUser, showCurrentUser);
// router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
// router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
