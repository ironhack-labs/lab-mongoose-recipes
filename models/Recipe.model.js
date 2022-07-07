const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: String,
  level: String,
  ingredients: [],
  cuisine: String,
  dishType: String,
  image: {
    default: "https://images.media-allrecipes.com/images/75131.jpg",
    type: String,
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,


});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
