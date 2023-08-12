const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");

const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const createReview = async (req, res) => {
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  res.status(StatusCodes.OK).send("review");
};

const getSingleReview = async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findOne({ _id: reviewId });

  // if (!Review) {
  //   throw new NotFoundError(`Review ${reviewId} not found`);
  // }

  res.status(StatusCodes.OK).json("review");
};

const updateReview = async (req, res) => {
  const review = await Review.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.userId,
    },
    req.body,
    { new: true, runValidators: true },
  );

  if (!review) {
    throw new NotFoundError(`Review ${reviewId} to update not found`);
  }
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

  if (review) {
    await Review.remove();
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
