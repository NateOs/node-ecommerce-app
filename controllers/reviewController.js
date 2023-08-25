const Review = require("../models/Review");
const Product = require("../models/Product");
const checkPermissions = require("../utils/checkPermissions");
const { StatusCodes } = require("http-status-codes");

const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new NotFoundError(`No product found for ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    // check if review already submitted, 1 review per user per product
    _id: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new BadRequestError(`Review already submitted on product by user`);
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  if (!reviews) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "No review found" });
  }

  res.status(StatusCodes.OK).send({ reviews });
};

const getSingleReview = async (req, res) => {
  const reviewId = req.params.id;

  const review = await Review.findById({ _id: reviewId }).populate({
    path: "product",
    select: "name company price",
  });

  if (!review) {
    throw new NotFoundError(`Review with id: ${reviewId} not found`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({
    _id: req.params.id,
  });

  if (!review) {
    throw new NotFoundError(`Review ${reviewId} to update not found`);
  }

  checkPermissions(req.user, review.user); // confirm user is rightful owner of the review

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({
    msg: "Review updated successfully",
    review,
  });
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`Review ${reviewId} to delete not found`);
  }

  checkPermissions(req.user, review.user); // confirm user is rightful owner of the review

  if (review) {
    await review.remove();
  }

  res.status(StatusCodes.OK).json({ msg: `deleted Review ${reviewId}` });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
