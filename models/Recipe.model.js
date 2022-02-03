const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    isRequired: true,
  },
  level: {
    type: String,
    enum: ["_Easy Peasy_", "_Amateur Chef_", "_UltraPro Chef_"],
  },
  ingredients: {
    type: `[String]`,
  },
  cuisine: {
    type: String,
    isRequired: true,
  },
  dishType: {
    type: String,
    enum: [
      "_breakfast_",
      "_main_course_",
      "_soup_",
      "_snack_",
      "_drink_",
      "_dessert_",
      "_other_",
    ],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/",
  },
  duration: {
    type: Number,
    minumum: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
