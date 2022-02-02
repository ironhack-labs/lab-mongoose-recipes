const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    unique: true,
    type: String,
    required: true

  },

  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']

  },

  ingredients: {
    type: [String]
  },

  cuisine: {
    type: String,
    required: true
  },

  DishType: {
    type: String,
    enum: ['breakfast', 'main course', 'soup', 'snack', 'drink', 'dessert', 'other'],
    default: 'main course'
  },

  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },

  duration: {
    type: Number,
    min: 0,
    max: 1000
  },

  creator: {
    type: String

  },

  created: {
    type: Date,
    default: 2022 / 02 / 02
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
