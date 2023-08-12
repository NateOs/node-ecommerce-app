const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter a name"],
      maxLength: [100, "Cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/exampple.jpg",
    },
    category: {
      type: String,
      required: [true, "Please enter a category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please enter a company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE is not supported}",
      },
    },
    colors: {
      default: ["#222"],
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);
