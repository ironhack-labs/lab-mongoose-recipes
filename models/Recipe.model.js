const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esto es el schema, el modelo
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],

  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: [
      "breakfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "snack",
      "dessert",
      "other",
    ],
  },
  image: {
    String,
    default: ["https://images.media-allrecipes.com/images/75131.jpg"],
  },

  duration: { type: Number, minimum: 0 },
  creator: String,
  created: { type: String, default: new Date() },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
