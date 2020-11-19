//1. IMPORTACIONES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//2. SCHEMA
const recipeSchema = new Schema({
  // Iteración 1: write the schema
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: { type: [String] },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: [
      "breackfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },
  image: {
    type: String,
    defaultValue: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, min: 0 },
  created: { type: Date, defaultValue: Date.now },
});

//3. MODELO
const Recipe = mongoose.model('Recipe', recipeSchema);

//4. EXPORTACION
module.exports = Recipe;
