'use strict';

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const Recipe = require('./models/recipe');
const data = require('./data.js');

// ----create our app-----

const app = express();

// -------config the views--
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

// ---------------connect to db--------

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// --------adding a recipe------------

Recipe.create({title: 'Scrambled eggs', level: 'Easy Peasy', ingredients: ['eggs', 'chees'], cousine: 'International', dishType: 'Breakfast', duration: 10, creator: 'Fred Flinstone'})
  .then((result) => {
    console.log(result.title);
  })
  .catch((err) => {
    console.log(err);
  });

// ------how do I use insertMany???-----------

for (let i = 0; i < data.length; i++) {
  Recipe.create(data[i], () => {
    console.log(data[i].title);
  });
}
// ---------how do I use findByIdAndUpdate---------
// Recipe.findByIdAndUpdate('5ad51a33bc709b74dddd9ebb', {duration: 100});

// -------------routes -------

// app.get('/', (req, res, next) => {
//   res.render('index', recipe);
// });

app.listen(3000, () => console.log('listening on port 3000'));
