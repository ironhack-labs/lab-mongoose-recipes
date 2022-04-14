const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    unique: true,
    type: String
  },

  level: {
    type: String,
  },

  ingredients: {
    type: [String]
  },

  cuisine: {
    type: String,
    require: true
  },

  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert']
  },

  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },

  duration: {
    type: Number,
    minlenght: 0
  },

  creator: {
    type: String
  },

  created: {
    Date: today
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
