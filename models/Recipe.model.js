const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    required: true,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    default: "Amateur Chef"
  },
  ingredients: { type: [], required: false },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
    default: "Other"
  },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, default: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now() }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
