const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
  // TODO: write the schema
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true
    },
    level: {
      type: String,
      values: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
      default: 'Easy Peasy'
    },
    ingredients: {
      type: [String]
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine style is required']
    },
    dishtype: {
      type: String,
      values: ['breakfast', 'main course', 'soup', 'snack', 'drink', 'dessert', 'other'],
      default: 'other'
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
      type: Number,
      min: [0, 'The minimum value should be 0']
    },
    creator: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now()
    }
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
