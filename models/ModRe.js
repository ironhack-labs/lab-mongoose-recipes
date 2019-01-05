const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const Recipe = new Schema({
  title: String,
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: String,
  duration: Number,
  creator: String,
  created: Date
});

const ModRe = mongoose.model('ModRe', Recipe);
module.exports = ModRe;