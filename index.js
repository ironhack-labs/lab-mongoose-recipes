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
// Create module

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const carbonara = new Recipe({ title: 'Carbonara' });
carbonara.save(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('mama mia pizzeria');
  }
});
