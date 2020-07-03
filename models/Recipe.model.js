const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const level = ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
const dishType = ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']

const recipeSchema = new Schema(
  {
    title: String,
    level: {
      type: String,
      enum: level,
    },
    ingredients: [String],
    cuisine: String,
    dishType: {
      type: String,
      enum: dishType
    },
    image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: String,
    created: {
      type: Date,
      default: new Date()
    }
  });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
