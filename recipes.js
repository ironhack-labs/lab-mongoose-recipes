const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const data      = require('./data.js');
const Recipe    = require('./models/recipe.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create(data[0])
  .then(data => {console.log(data[0] + 'Receta insertada')})
  .then( () => {
    return Recipe.find({}, {title:1, _id:0})
  })
  .catch(err => {console.log(err)});

Recipe.insertMany([, ...data])
  .then(data => {console.log('inserted')})
  .catch(err => {console.log(err)});


