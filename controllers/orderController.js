const Order = require("../models/Order");
const SingleCartItem = require("../models/SingleCartItem");
const checkPermissions = require("../utils/checkPermissions");
const { StatusCodes } = require("http-status-codes");

const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const createOrder = async (req, res) => {
  res.send("create order");
};

const getAllOrders = async (req, res) => {
  res.send("get all orders");
};

const getCurrentUserOrders = async (req, res) => {
  res.send("get current user orders");
};

const updateOrder = async (req, res) => {
  res.send("update user order");
};

const getSingleOrder = async (req, res) => {
  res.send("get a single user order");
};

module.exports = {
  createOrder,
  updateOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
};
