const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
  title: {
    type: String,
    required: true,
    unique: true
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
  dishType: {
    type: String,
    enum: ['breakfast', 'main course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
