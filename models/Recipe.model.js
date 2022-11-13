const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: [String],
  cuisine: {
    type: String,
    required: true,
  },
  dishType: String,
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: Number,
  creator: String,
  created: {
    type: Date,
    default: Date.now(),
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
