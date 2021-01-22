const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  ingredients: [String],
  dishType: String,
  image: {
    type: String,
    default: `https://images.media-allrecipes.com/images/75131.jpg`,
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
