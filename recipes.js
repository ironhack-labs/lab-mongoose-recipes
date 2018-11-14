const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/RecipeSchema.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({title: 'Recipe 1', level: 'Easy Peasy', ingredients: ['Tomatoe','Fish'], cusine: 'Spanish'
, dishType : 'Dish',duration: 120, creator: 'Sandra' })
  .then(user => { console.log('The user is saved and its value is: ', user) })
  .catch(err => { console.log('An error happened:', err) });