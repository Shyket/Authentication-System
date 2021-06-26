const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign({ ...user }, process.env.SECRET_KEY, { expiresIn: "1800s" });
};

exports.authenticateToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
