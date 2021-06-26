const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    trim: true,
  },

  username: {
    type: String,
    required: [true, "username is required"],
  },

  gender: {
    type: String,
    enum: ["male", "female", "3rd gender"],
    required: [true, "gender is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    max: 16,
  },
});


module.exports = mongoose.model("Users", UserSchema);
