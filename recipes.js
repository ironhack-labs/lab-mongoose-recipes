const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')
const Recipe = require('./models/Recipe');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

data.forEach( e => {
  Recipe.create( e );
})