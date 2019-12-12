const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
  // TODO: write the schema
  title: { type: String, required: true, unique: true}, // It should be required and unique.
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] }, // Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef 
  ingredients: { type: Array},
  cuisine: { type:String, required: true}, // Should be required.
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] }, // Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},  // Default value: https://images.media-allrecipes.com/images/75131.jpg.
  duration: { type: Number, min: 0}, //Min value should be 0.
  creator: { type: String},
  created: { type: Date, default: Date.now()} // By default today.
});


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
