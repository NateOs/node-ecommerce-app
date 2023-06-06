require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("App is ready");
});

const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is live, port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
