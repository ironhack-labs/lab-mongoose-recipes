const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  ingredients: [String],
  cuisine: String,
  dishType: [
    "breakfast",
    "main_course",
    "soup",
    "snack",
    "drink",
    "dessert",
    "other",
  ],
  image: String,
  duration: Number,
  creator: String,
  created: Date,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
