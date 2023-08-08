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
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.find({ _id: productId });

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    {
      _id: req.params.id,
      user: req.user.userId,
    },
    req.body,
    { new: true, runValidators: true },
  );
  res.status(StatusCodes.OK).json({
    msg: "Product updated successfully",
    product,
  });
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
