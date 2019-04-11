const mongoose = require('mongoose');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

//
const app = express();

app.use(express.static('public'));
app.use(bodyParser());

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

function createRecipe(rec) {
  const recipe = new Recipe({ rec });
  recipe.save(err => {
    err ? console.error() : console.log('asdm');
  });
}
createRecipe(data[0]);

function createRecipes(arr) {
  Recipe.insertMany(arr, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('nuova');
    }
  });
}
createRecipes(data);
Recipe.updateOne(
  { title: 'Rigatoni alla Genovese' },
  { duration: 100 },
  err => {
    err ? console.error(err) : console.log('update');
  }
);

Recipe.deleteOne({ title: 'Carrot Cake' }, err => {
  err ? console.error(err) : console.log('removed');
});
