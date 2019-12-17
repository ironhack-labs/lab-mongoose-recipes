const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


Recipe.create(
  {title: 'Peanut Butter and Jelly Sandwich'},
  {level: 'Can boil water'},
  {ingredients: ['1 teaspoon of jelly', '1 teaspoon of peanut butter', '2 pieces of bread']},
  {cuisine: 'American'},
  {dishType: 'Sandwich'},
  {image: 'https://en.wikipedia.org/wiki/Peanut_butter_and_jelly_sandwich#/media/File:Peanut-Butter-Jelly-Sandwich.png'},
  {duration: 5},
  {creator: 'Julia Davis Chandler'})

  // Movies.insertMany(arr, function(error, docs) {});