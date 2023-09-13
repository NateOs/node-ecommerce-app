const Order = require("../models/Order");
const Product = require("../models/Product");

const checkPermissions = require("../utils/checkPermissions");
const { StatusCodes } = require("http-status-codes");

const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { amount, client_secret };
};

const createOrder = async (req, res) => {
  const { tax, shippingFee, items: cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new BadRequestError("No shipping fee or tax provided");
  }

  let orderItems = [];
  let subtotal = 0;

  // make final calculations of item totals
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new NotFoundError("Product not found");
    }

    const { name, price, image, _id } = dbProduct;

    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    
    // calculate subtotal
    subtotal += item.amount * price;

    const total = tax + shippingFee + subtotal;

    // get clientsecret from stripe, using fake one this time
    const paymentIntent = await fakeStripeAPI({
      amount: total,
      currency: "USD",
    });

    const order = await Order.create({
      orderItems,
      total,
      subtotal,
      tax,
      shippingFee,
      clientSecret: paymentIntent.client_secret,
      user: req.user.userId,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ order, clientSecret: order.client_secret });
  }
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
