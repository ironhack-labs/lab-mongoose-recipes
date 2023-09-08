const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  //Iteration 1 - Recipe Schema
  title: String,
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cuisine: String,
  dishType: {type: String, enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jp'},
  duration: Number,
  creator: String,
  created: Date
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
