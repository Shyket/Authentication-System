const User = require("../Model/user.model");
const { comparePassword, hashPassword } = require("../Utils/bcrypt");
const { generateToken, authenticateToken } = require("../Utils/jwt");
var path = require("path");

exports.signup = async (req, res) => {
  try {
    var { email, password, gender, username } = req.body;
    var user = await User.findOne({ email });
    if (user) {
      res.status(402).json({
        error: {
          email: "Email Address Already registered",
        },
      });
    }
    password = await hashPassword(password);
    console.log(password);
    user = new User({ email, password, gender, username });
    await user.save();
    //res.json({ error: false, user: { email, gender, username } });
    res.status(200).redirect("/auth/login");
  } catch (err) {
    res.status(402).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await User.findOne({ email });
    if (!user) {
      res.status(402).json({
        error: {
          email: "This email is not assosiated with any email address",
        },
      });
    }

    if (!comparePassword(password, user.password)) {
      res.status(402).json({
        error: {
          password: "Incorrect Password",
        },
      });
    }
    const token = await generateToken(user);

    res.cookie("authorization", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.cookie("username", user.username, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    
    res.redirect("/deshboard");
  
  } catch (err) {
    res.status(402).json({ error: err.message });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.authorization;

    if (token == null) {
      res.status(402).json({
        error: { authorization: "Access Denied! Unauthorized Access" },
      });
      return res.redirect("/auth/login");
    }

    const data = await authenticateToken(token);
    //console.log(data._doc._id);
    req.userID = data._doc._id;
    next();
  } catch (err) {
    res.status(402).json({ error: err.message });
  }
};
