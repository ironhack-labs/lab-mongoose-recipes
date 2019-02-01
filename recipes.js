const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredient: [],
  cuisine: { type: String, required: true },
  dishType: { type: String },
  image: {
    type: String,
    match: /^https?:\/\//
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: [Date]
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
