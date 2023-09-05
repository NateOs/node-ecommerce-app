const mongoose = require("mongoose");
const { CustomAPIError } = require("../errors");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please provide a valid rating"],
      min: 1,
      max: 5,
    },
    title: {
      trim: true,
      type: String,
      required: [true, "Please provide a title"],
      maxlength: 50,
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
      maxlength: 100,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);
ReviewSchema.index({ product: 1, user: 1 }, { unique: true }); // means a user can post only one review to a product

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const aggregationResult = await this.aggregate([
    { $match: { product: productId } }, // Match reviews for the specified product,
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" }, // Calculate the average of the 'rating' field
        numberOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(aggregationResult[0]?.averageRating || 0),
        numberOfReviews: aggregationResult[0]?.numberOfReviews || 0,
      },
    );
  } catch (err) {
    console.log(err);
    throw new CustomAPIError("Couldn't find product");
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
