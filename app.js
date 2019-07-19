// Get environment settings
require('dotenv').config();

// Get dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser   = require('body-parser');
const hbs          = require('hbs');
const path         = require('path');

// Connect to database
mongoose.connect('mongodb://localhost/recipes', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Create the app
const app = express();

// Define views and static folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

// Add other middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up routing
const index = require('./routes/index');
app.use('/', index);

// const recipes = require('./routes/recipes');
// app.use('/recipes', recipes);

// Export (needed in www.js)
module.exports = app;