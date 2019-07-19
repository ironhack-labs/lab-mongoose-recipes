const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
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


const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;
