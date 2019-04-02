const mongoose = require('mongoose');

const recipesShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: [{
    type: String
  }],
  cuisine: [{
    required: true,
    type: String
  }],
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  },
  avatarUrl: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg.'
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
  },
});

const Recipes = mongoose.model('Recipes', recipesShema);
module.exports = Recipes;