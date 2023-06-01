const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('App is ready');
})

const start = async () => {
  try {
    app.listen(port, console.log(`Server is live, port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
