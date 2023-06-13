const mongoose = require('mongoose');

const recipesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },

  ingredients: [String],

  cuisine: {
    type: String,
    required: true
  },

  dishType: {
    type: String,
    enum: ['Breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert','other']
  },

  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },

  duration:{
    type: Number,
    min: 0
  },

  creator: String,

  created: {
    type: Date,
    default: Date.now
  }

});

const Recipe = mongoose.model('Recipe', recipesSchema);

module.exports = Recipe;

// acomodada la 1era iteration