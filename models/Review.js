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
      required: [true, "Please provide a title"],
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
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);