// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  credicard: {
    type: String,
  },
});

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userModel.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.models.users || mongoose.model("user", userModel);
