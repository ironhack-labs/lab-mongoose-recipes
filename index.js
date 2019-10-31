const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('./models/Recipe');
const data = require('./data.js');
const { saveRecipe , saveAllRecipes , deleteOneByTitle , updateByTitle } = require('./controllers')

const app = express();


mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });














const closeConnection = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
  })
};


setTimeout(closeConnection, 5000)


