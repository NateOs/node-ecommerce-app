const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
		cartItems: [
		
	],
    status: {
      type: String,
      enum: ["pending", " failed", "paid", "delivered", "cancelled"],
      default: "pending",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
      required: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", OrderSchema);
