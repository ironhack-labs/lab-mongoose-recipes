const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
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
    enum: ["main_course", "dessert"],
  },

  image: {
    type: String,
    default: "/images/paella.jpg",
  },

  duration: {
    type: Number,
    min: 0,
  },

  creator: String,

  created: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
