const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: String, 
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg."},
  duration: Number,
  creator: String
});



const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
