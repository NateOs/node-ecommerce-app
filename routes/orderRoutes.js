const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const { authorizePermissions } = require("../middleware/authorizePermissions");

const {
  createOrder,
  updateOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
} = require("../controllers/orderController");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);

router
  .route(":/id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

module.exports = router;
