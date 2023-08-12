require("dotenv").config();
require("express-async-errors"); //sets up try catch for all routes

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cookieParser = require("cookie-parser");

// express
const express = require("express");

const app = express();

// other packages
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 5000;

// db
const connectDB = require("./db/connect");

// middleware
const notFoundMiddleware = require("./middleware/not-found"); // returns a 404 message, when route is not found
const errorHandlerMiddleware = require("./middleware/error-handler"); // returns human readable errors

app.use(morgan("tiny"));
app.use(express.json()); // allows you to parse json from req.body
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/review", reviewRouter);

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send({ msg: "ecommerce api" });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is live, port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
