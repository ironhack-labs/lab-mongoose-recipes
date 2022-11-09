const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    set: value => value.charAt(0).toUpperCase() + value.substring(1)
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: [String]
  },
  cusine: {
    type: String,
    required: true
  },

  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },

  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },

  creator: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
