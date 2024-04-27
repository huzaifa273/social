const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  profilePicture: {
    type: String,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  verified: {
    type: Boolean,
    default: false,
    require: true,
  },
});

module.exports = mongoose.model("User", UserScheme);
