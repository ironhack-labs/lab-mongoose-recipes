const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String },
  level: { type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: { type: Array,}, // Nao sei se funciona
  cuisine: { type: String },
  dishType: { type: String },
  image: { type: String },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, value: Date.now } // Nao sei se funciona
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
