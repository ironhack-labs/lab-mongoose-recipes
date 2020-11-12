// Import packages and get function
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Make schema for recipes
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [ String ],
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: new Date(2020, 11, 12),
  }
});

// Make new collection
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
