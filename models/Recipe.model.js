// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const {Schema, model } = require("mongoose")

const recipeSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [String],
  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: Number,
  creator: String,
  created: {
    type: Date,
    default: Date.now,
  }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
