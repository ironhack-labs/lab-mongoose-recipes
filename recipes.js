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

Recipe.create(data[0], () => {
  console.log(data[0].title);
});

for (let i = 1; i < data.length; i++) {
  Recipe.create(data[i], () => {
    console.log(data[i].title);
  });
}

Recipe.findByIdAndUpdate('5ad51a33bc709b74dddd9ebb', {duration: 100} );
// -------------routes -------

// app.get('/', (req, res, next) => {
//   res.render('index', recipe);
// });

app.listen(3000, () => console.log('listening on port 3000'));
