const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const Recipe = require('./models/recipe-schema.js');

const recipeData = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');

    Recipe.create({ title: 'Arroz', cuisine: 'Spanish' })
    .then(recipe => { console.log('The recipe is saved and its value is: ', recipe) })
    .catch(err => { console.log('An error happened:', err) });


    // insertMany
    Recipe.insertMany(recipeData)
    .then(recipes => { console.log('The recipes are saved and its value are: ', recipes) })
    .catch(err => { console.log('An error happened:', err) });

    
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
