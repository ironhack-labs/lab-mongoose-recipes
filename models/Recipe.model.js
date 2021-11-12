const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: { type: "string", required: true, unique: true },
  level: {
    type: "string",
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    unique: true,
  },
  ingredients: { type: ["string"] },
  cuisine: { type: "string", required: true },
  dishType: {
    type: "string",
    enum: [
      "breakfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },
  image: {
    type: "string",
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: "number", min: 0 },
  creator: { type: "string" },
  created: { type: "Date", default: new Date() },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
