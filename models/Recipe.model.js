const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],
  cuisine: String,
  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink"],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: Number,
  creator: String,
  created: Date,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
