const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const path = require ('path')

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
  
//Iteration 1 - Recipe Schema

const recipeSchema = new Schema({
  title: String,
  level: {type:String,enum:['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: Array,
  cuisine: String,
  dishType: {type:String,enum:['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {type:String,default:"https://images.media-allrecipes.com/images/75131.jpg"},
  duration: { type: Number, min: 0},
  creator: String,
  created: {type:Date,default:Date.now},
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

//Iteration 2 - Create a recipe

Recipe.create({ title: 'Yogurt cake', level:"Easy Peasy", ingredients: ['1 pot yogurt','2 pots sucre','3 pots farine','3 eggs']})
.then(recipe => { console.log('The recipe is saved') })
.catch(err => { console.log('An error happened:', err) });


// Iteration 3 - Insert Many recipes

Recipe.insertMany(data);
