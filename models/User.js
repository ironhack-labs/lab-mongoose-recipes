const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  favourite_cuisine: String,
  dob: Date
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;