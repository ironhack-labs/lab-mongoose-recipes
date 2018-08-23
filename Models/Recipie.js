const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  level: String,
  ingredients: Array,
  cousine: String,
  dishType: String,
  image: String,
  duration: Number,
  creator: String,
  created: Date
});

module.exports = mongoose.model("recipie", recipeSchema);
