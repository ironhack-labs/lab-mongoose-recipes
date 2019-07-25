const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;