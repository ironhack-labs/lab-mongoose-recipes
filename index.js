const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  Recipe.create({title: 'teste2', level: 'Easy Peasy', ingredients: ['apple', 'orange'], cuisine: 'something', dishType: 'Dish', image: 'https://images.media-allrecipes.com/images/75131.jpg.', duration: 3, creator: 'Jef'})
  .then((recipe) => {
    console.log(`${recipe}!`);
  })
  .catch(err => {console.log('An error happened:', err)});