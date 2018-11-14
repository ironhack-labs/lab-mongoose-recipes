const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const Recipe = require(`./models/RecipeSchema`)


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.collection.drop();

Recipe.insertMany(data)
  .then(recipe => recipe.forEach((elem) => console.log(`The recipe is created and it is: `, elem.title)))
  .catch(err => console.log(`An error happened: `, err))