const express = require("express");
const router = express.Router();

const { login, logout, register } = require("../controllers/authController");

router.post("/register", register);
router.get("/logout", logout);
router.post("/login", login);


module.exports = router;
