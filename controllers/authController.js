const logout = (req, res, next) => {
  console.log("logout user");
  res.send("logout route");
};
const login = (req, res, next) => {
  console.log("login user");
  res.send("login route");
};
const register = (req, res, next) => {
  console.log("register user");
  res.send("register route");
};

module.exports = { register, login, logout };
