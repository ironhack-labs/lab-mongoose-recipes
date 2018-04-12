'use strict';
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;
const data = require('./data.js');
console.log(data);
// create the app
const app = express();
// config the views
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

// middlewares

app.use(express.static('public'));

// connecting to database
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// routes
app.get('/', (req, res, next) => {
  const recipe = {
    recipe: data
  };
  res.render('index', recipe);
});

app.listen(3000, () =>
  console.log('listening on port!'));
