const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

exports.hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};
