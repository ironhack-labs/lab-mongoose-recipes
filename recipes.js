const mongoose = require('mongoose');
const data = require('./data.js');

const Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch((err) => {
    console.error('Error connecting to mongo', err)
  });
