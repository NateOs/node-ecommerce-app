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

// as long as user is admin, response will be returned
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ hits: orders.length, orders });
};

const getCurrentUserOrders = async (req, res) => {
  const userId = req.user.userId;
  const userOrders = await Order.find({ user: userId });
  if (!userOrders.length < 0) {
    throw new NotFoundError("User has no orders");
  }
  res
    .status(StatusCodes.OK)
    .json({ hits: userOrders.length, orders: userOrders });
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const paymentIntent = req.body.paymentIntentId;

  const order = await Order.findOne({ _id: orderId });

  checkPermissions(req.user, order.user);

  if (!order) {
    throw new NotFoundError("Order with id " + orderId + "not found");
  }

  order.paymentIntentId = paymentIntent;
  order.status = "paid";

  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new NotFoundError("Order with id " + orderId + " not found");
  }

  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  createOrder,
  updateOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
};
