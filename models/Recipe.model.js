const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: String, 
  enum: ["Easy Peassy", "Amateur Chef", "UltraPro Chef",],
  ingredients: String,
  enum: [],
  cuisine: String,
  required: true,
  dishType: String,
  enum: ["breakfast", "main_course", "soup", "snack", "drink", "desert", "other",],
  image: String,
  default:"https://images.media-allrecipes.com/images/75131.jpg",
  duration: Number,
  min: [0],
  creator: String,
  created: Date,
  default: ["18/11/21"],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
