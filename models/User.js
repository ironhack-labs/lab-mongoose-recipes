const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScema = new Schema({
  username: String,
  password: String
});

const User = mongoose.model('users', userSchema);

module.exports = User;