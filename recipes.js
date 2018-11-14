const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title : {type: String, required: true, unique: true},
  level: {String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: ' https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
});


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

Recipe.create({title: 'Gazpacho', level: 'Easy Peasy', cuisine: 'Española' })
  .then(recipe => { console.log('The user is saved and its value is: ', recipe.title) })
  .catch(err => { console.log('An error happened:', err) });


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
