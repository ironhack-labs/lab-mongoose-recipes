const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

  title: {
    type: String,
  },

  level: {
    type: String,
    enum: ['Easy peasy', 'Amateur Chef', 'UltraPro Chef'],
  },

  ingredients: {

    type: [String]

  },

  cuisine: {
    type: String
  },

  dishType: {
    type: String,
    enum: ['breffast', 'main_Course', 'soup', 'snak', 'drink', 'dessert', 'other']
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"

  },
  duration: {

    type: Number,
    min: 0,

  },

  creator: {

    type: String

  },

  created: {

    type: Date,

  }


});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
