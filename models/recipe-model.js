const mongoose = require("mongoose");

// get access to the Schema class from Mongoose
const Schema = mongoose.Schema;

// use the Schema class to create our dog Schema object
// (the schema is the STRUCTURE of documents in the model's collection)
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true }, // Type String. It should be required and unique.
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  }, // Type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM wink)
  ingredients: { type: [String] },
  cuisine: { type: String, required: true }, // Type String. Should be required.
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  }, // Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
    match: /^https?:\/\//
  }, // Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
  duration: { type: Number, min: 0 }, // Type Number. Min value should be 0.
  creator: { type: String }, // Type String
  created: { type: Date, default: new Date() } // Type Date. By default today.
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// share the "Recipe" variable with other files that require recipe-model.js
// Recipe is our mongoose model that connects to the "recipe" collection

module.exports = Recipe;
