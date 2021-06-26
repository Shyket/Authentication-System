const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorList = {};
    errors.array().map((err) => (errorList[err.param] = err.msg));
    console.log(errorList);
    return res.status(404).json({ errorList });
  }

  next();
};
