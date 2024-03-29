const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const validationResult = require("../Middleware/validateRequest");
const { signup, login } = require("../Controller/auth.controller");
var path = require("path");

router.get("/", (req, res) => {
  res
    .status(200)
    .send(path.join(__dirname, "../../AdminLTE-master", "index3.html"));
});

router.get("/login", (req, res) => {
  res
    .status(200)
    .render(
      path.join(
        __dirname,
        "../../AdminLTE-master/pages/examples",
        "login-v2"
      )
    );
});

router.get("/signup", (req, res) => {
  res.render(
    path.join(
      __dirname,
      "../../AdminLTE-master/pages/examples",
      "register"
    )
  );
});

router.post(
  "/signup",
  [
    check("username")
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage("username is required"),
    check("email")
      .exists()
      .notEmpty()
      .isEmail()
      .withMessage("Enter a valid email address"),
    check("gender")
      .exists({ checkNull: true, checkFalsy: true })
      .notEmpty()
      .isIn(["male", "female", "3rd gender"])
      .withMessage("gender must be male, female or 3rd gender"),
    check("password")
      .exists({ checkNull: true, checkFalsy: true })
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    check("confirm-password")
      .exists({ checkNull: true, checkFalsy: true })
      .notEmpty()
      .custom((value, { req }) => value === req.body.password)
      .withMessage("confirm password must match with password"),
  ],
  validationResult,
  signup
);

router.post(
  "/login",
  [
    check("email")
      .exists({ checkNull: true, checkFalsy: true })
      .notEmpty()
      .isEmail()
      .withMessage("Enter a valid email address"),
    check("password")
      .exists({ checkNull: true, checkFalsy: true })
      .notEmpty()
      .withMessage("password cant be empty"),
  ],
  validationResult,
  login
);

module.exports = router;
