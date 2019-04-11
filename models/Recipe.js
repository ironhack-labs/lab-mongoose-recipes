const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    String,
    enum: ["Easy Peasy", "Amateur Chef", "Ultrapro Chef"]
  },
  ingredients: [],
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https: //images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: o
  },
  Creator: String,
  Created: {
    type: Date,
    default: Date.now
  }

});


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;