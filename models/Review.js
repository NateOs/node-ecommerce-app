const mongoose = require("mongoose");

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
  console.log(productId);
};

// ReviewSchema.statics.calculateAverageRating = async function (productId) {
//   const aggregationResult = await this.aggregate([
//     {
//       $match: { productId: productId }, // Match reviews for the specified product
//     },
//     {
//       $group: {
//         _id: null,
//         averageRating: { $avg: "$rating" }, // Calculate the average of the 'rating' field
//       },
//     },
//   ]);

//   if (aggregationResult.length > 0) {
//     const averageRating = aggregationResult[0].averageRating;
//     return averageRating;
//   } else {
//     return 0; // No reviews found for the product
//   }
// };

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);