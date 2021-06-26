const User = require("../Model/user.model");
const { comparePassword, hashPassword } = require("../Utils/bcrypt");
const { generateToken } = require("../Utils/jwt");

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
    res
      .status(200)
      .json({ error: false, user: { email, gender, username } });
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

    res.status(200).json({ jwt: token });
  } catch (err) {
    res.status(402).json({ error: err.message });
  }
};
