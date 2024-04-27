const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const VerificationTokenScheme = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

VerificationTokenScheme.pre("save", async function (next) {
  if (this.isModified("token")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.token, salt);
      this.token = hash;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("VerificationToken", VerificationTokenScheme);
