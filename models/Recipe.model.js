const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },

  Level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },

  Ingredients: {
    type: [String],
  },

  Cuisine: {
    type: String,
    required: true,
  },

  dishType: {
    type: String,
    enum: ['breakfast', 'main course', 'soup', 'snack', 'drink', 'dessert', 'other'],
  },

  Image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },

  Duration: {
    type: Number,
    min: 0,
  },

  Creator: {
    type: String,
  },

  Created: {
    type: Date,
    default: Date.now(),
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
