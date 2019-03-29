const Reciepe = require('./models/recipe.model');
const data = require('./data.js');
const mongoose = require('mongoose');

// Init mongodb connection
require('./configs/db.config');










/*mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
*/