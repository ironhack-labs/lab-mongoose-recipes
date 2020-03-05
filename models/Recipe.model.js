const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//ITERATION 1 
// Create a Recipe model inside the file /models/Recipe.model.js. The schema should have the following fields:

// title - type String. It should be required and unique.
// level - type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉)
// ingredients - type Array.
// cuisine - type String. Should be required.
// dishType - type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
// image - type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
// duration - type Number. Min value should be 0.
// creator - type String
// created - type Date. By default today.

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  level: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef' ],
  ingredients: Array,
  cuisine: {
    type: String,
    required: true
  },
  dishType: String, enum:['Breakfast','Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  image: { 
    type: String, 
    default: 'https://images.media-allrecipes.com/images/75131.jpg' 
  },
  duration: {
    type: Number, 
    min: 0
  },
  creator: String, 
  created: {
    type: Date, 
    default: Date.today 
  }
});



const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
