//SETUP
//-----------------------------------
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// SCHEMA 
//-----------------------------------
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: {
    type: Array
  },

  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  },
});

// FIELDS 
//-----------------------------------
// title. Type String. It should be required and unique.
// level. Type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉)
// ingredients. Type Array.
// cuisine. Type String. Should be required.
// dishType. Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
// image. Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
// duration. Type Number. Min value should be 0.
// creator. Type String
// created. Type Date. By default today.


const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;