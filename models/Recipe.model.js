const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema (mongoose term)
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: { type: String, required: true, unique: true },
  ingredients: [String],
  cuisine: { type: String, required: true },
  dishType: { type: String },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, default: 0 },
  creator: { type: String },
  created: { type: Date, default: new Date() },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
