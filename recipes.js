const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const PORT= 3000;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

