const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'Ultra Chef']
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now,
  }
});

const Recipe = mongoose.model ('Recipe', recipeSchema);
module.exports = Recipe;