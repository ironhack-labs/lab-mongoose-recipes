const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [],
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: { type: String, match: /^https?:\/\// },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: 02 / 01 / 2019 }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
