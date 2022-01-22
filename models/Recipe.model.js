const mongoose = require("mongoose");

const recipe = new mongoose.Schema({
  title: String,
  level: String,
  ingredients: [String],
  cuisine: String,
  dishType: String,
  image: String,
  duration: Number,
  creator: String,
  created: Date,
});

const Recipe = mongoose.model("Recipe", recipe);

module.exports = Recipe;
