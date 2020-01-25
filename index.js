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

// ITERATION 2

Recipe.create(Recipe)
  .then(Recipe => console.log(`The title of this recipe is: ${Recipe.title}`))
  .catch(error => console.log('Error'));

// ITERATION 3

Recipe.insertMany(Recipe)
  .then(Recipe => console.log(`The title of this recipe is: ${Recipe.title}`))
  .catch(error => console.log('Error'));