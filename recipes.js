const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data     = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

//Iteration#1 create new Schema
const recipeSchema = new Schema ({
  title       : {type : String, required : true, unique : true},
  level       : {type : String, enum : ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients : [],
  cuisine     : {type : String, required : true},
  dishType    : {type : String, enum : ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image       : {type : String, default : 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration    : {type : Number, min: 0},
  creator     : {type : String},
  created     : {type : Date, default : Date.now}
})

//Iteration#2 Use the Model.create method to pass the info to create a new recipe
const Recipe = mongoose.model('Recipes', recipeSchema);
module.exports = Recipe;

Recipe.create({
  title   : 'Homemade Beef Stroganoff',
  level   : 'Amateur Chef',
  ingredients : ['2 Pounds Beef Round Steak', 'Salt & Pepper', '4 Tablespoons Butter', '2 Cups Sliced Mushrooms', 'Onion'],
  cuisine     : 'American',
  dishType    : ['Dish'],
  duration    : 30,
  creator     : 'Chef Pepin'
})
  .then(recipe => { console.log('The new recipe is: ', recipe.title)})
  .catch(err => { console.log('An error happened: ', err)})
