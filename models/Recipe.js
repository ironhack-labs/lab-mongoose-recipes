const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

title: {
  type: String,
  required: true
},

level: {
  type: String,
  value: [Easy Peasy, Amateur Chef - UltraPro Chef]
},
 ingredients: {
   type: []
 },
 cuisine: {
  type: String,
  required: true
 },
 dishType: {
  type: String,
  values: Breakfast - Dish - Snack - Drink - Dessert - Other
 },
 image: {
   default: https://images.media-allrecipes.com/images/75131.jpg
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
  default: Date.now
}

