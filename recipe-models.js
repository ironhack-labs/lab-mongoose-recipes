const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Iteration 1 - Recipe Schema
// use the Schema to create recipe schema object
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [{ type: Array }],
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: { type: String },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: [Date] }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
