const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

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
    const newRecipe =
    {
      "title": "Orange and Milk-Braised Pork Carnitas",
      "level": "Easy Peasy",
      "ingredients": [
        "3 1/2 pounds boneless pork shoulder, cut into large pieces",
        "1 tablespoon freshly ground black pepper",
      ],
      "cuisine": "American",
      "dishType": "Breakfast",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
      "duration": 160,
      "creator": "Chef John"
    }
    Recipe.create(newRecipe)
  })
  .then(() => {
    Recipe.insertMany(data)
  })
  .then(() => {
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(() => {
      console.log("Recipe updated")
    })
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => {
      console.log("Recipe deleted")
    })
  })
  .then(() => {
    mongoose.connection.close()
    .then(() => {
      console.log("Connection closed")
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


