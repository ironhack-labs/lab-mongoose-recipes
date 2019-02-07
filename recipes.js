const express = require('express');
const hbs = require('hbs');
const app = express();
const mongoose = require('mongoose');
//const data = require('./data');

mongoose.connect('mongodb://localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let recipes = require('./routes/recipes');

app.use('/recipes', recipes);

app.listen(3000, ()=>console.log('all set'));