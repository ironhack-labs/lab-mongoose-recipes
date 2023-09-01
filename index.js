const express = require("express");
const app = express();
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
  const myRecipe = {
    title: "Tortilla de papas",
    level: 'Easy Peasy',
    ingredients: ["potatoes", "eggs", "oil", "salt"], 
    cuisine: "Spanish",
    dishType:  "Mediterranean food",
    duration:  1, 
    creator: "Davinia Tosco"
  }
  return Recipe.create(myRecipe)
  })
  .then((element) => {
    console.log(element.title)

    return Recipe.insertMany(data)
  })
  .then((elements) => {
    console.log('all the recipes has been added', elements)
   
    return Recipe.findOneAndUpdate( {title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then((updatedRecipe) => {
    console.log('Great, duration has been updated', updatedRecipe)

    return Recipe.deleteOne( {title: "Carrot Cake"})
})
.then((deletedRecipe) => {
  console.log('The carrot cake has been removed', deletedRecipe)
})

 .catch(error => console.log('An error happened while connecting to recipe database', error));

 mongoose.connection.close();
  