const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//ITERATION 1
const recipeSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    level: { type: String },
    ingredients: { type: [String] },
    cuisine: { type: String },
    dishType: { type: String },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: { type: Number },
    creator: { type: String },
  },
  {
    timestamp: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
