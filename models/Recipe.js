const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: [],
  cuisine: String,
  dishType: String,
  image: {String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: Number,
  creator: String,
  created: {Date, default: today}

  
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
