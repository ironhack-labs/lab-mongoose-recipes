const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true
  },
  //It should be required and unique.
  level: {
    type: String,
    enum: ["Amateur Chef", "UltraPro Chef", "Easy Peasy"]
  },
  //Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉)
  ingredients: {
    type: Array
  },
  cuisine: {
    type: String,
    required: true
  }, //  Should be required.
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  }, //Possible values:
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg."
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: new Date()
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
