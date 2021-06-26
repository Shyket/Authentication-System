const bcrypt = require("bcrypt");

exports.comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};
