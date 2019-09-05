const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    unique:true
  },
  level: {
    type: String,
    enum: ["Easy Peasy","Amateur Chef","UltraPro Chef"]
  },
  ingredients: Array, //Not working in MongoDb
  cuisine: { type: String, required: true },
  dishTipe: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: String,
created: { type: Date, default: Date.now /*new Date()will not work*/ }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
