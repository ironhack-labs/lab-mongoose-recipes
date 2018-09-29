const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const recipeSchema = require('./models/RecipeSchema');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


