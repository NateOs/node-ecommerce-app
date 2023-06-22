const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please enter a email address"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: 6,
    maxLength: 100,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
