const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "all prodcuts" });
};
const getSingleProduct = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "single product" });
};
const updateProduct = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update product" });
};
const deleteProduct = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "delete product" });
};
const uploadImage = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "upload Image" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
