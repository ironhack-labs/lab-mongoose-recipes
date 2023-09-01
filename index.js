const mongoose = require('mongoose');
const express = require("express");
const app = express()
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let myRecipe = {
    title : "Torta",
    level : "Okey",
    ingredients : "Palta",
    cuisine : "High",
    dishType : "Asian",
    image : "Yes",
    duration : "10",
    creator : "Paris Hilton",
    created: "yes"
    }

    Recipe.create(myRecipe, (error, recipe) => {
      if (error) {
        console.log('An error happened:', error);
        return Recipe;
      }
      console.log("Recepi");
    });

    // The same code as above but with a Promise version
    Recipe.create(data)
      .then(user => console.log('The user is saved and its value is: ', user))
      .catch(error => console.log('An error happened while saving a new user:', error));

  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



