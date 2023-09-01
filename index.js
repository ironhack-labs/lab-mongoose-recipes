  const express = require("express");
  const app = express();
  const mongoose = require('mongoose');
  mongoose.set('strictQuery', true); 
  //warning//
  // [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. 
  //Use `mongoose.set('strictQuery', false);` // if you want to prepare for this change. 
  //Or use `mongoose.set('strictQuery', true);` to suppress this warning.


  // Import of the model Recipe from './models/Recipe.model.js'

  // Import of the data from './data.json'
  const data = require('./data'); //import from data.js
  const Recipe = require("./models/Recipe.model") //import Schema
  // from const Recipe = mongoose.model('Recipe', recipeSchema);

  const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

  // ...

  // Connection to the database "recipe-app"
  mongoose
    .connect(MONGODB_URI)
    .then((resp) => console.log("connected to", resp.connections[0].name));
      // Before adding any recipes to the database, let's remove all existing ones
      return Recipe.deleteMany()

    .then(() => {

      return Recipe.insertMany(data) //get
    })
    .then((insertedRecipes) => {
      insertedRecipes.forEach( // each recipe looping
        (recipe) => {console.log(`${recipe.title}`)})
    })
    .then( () => {
      return Recipe.findOneAndUpdate ({ title: 'Rigatoni alla Genovese' }, { duration: '100' })
    })
    
    .then (() => {
      
    Recipe.deleteOne({ title: 'Carrot Cake' })})
    .then(() => {
      console.log("Carrot Cake has Changed!");
    })
    .then(() => {
     
      const newRecipe = {
        "title": "titleName",
        "level": "Easy Peasy",
        "ingredients": ["ingre1", "ingre2", "ingre3"],
        "cuisine": "cuisineType",
        "dishType": "soup",
        "image": "url",
        "duration": 40,
        "creator": "creatorName"
      };
      return Recipe.create(newRecipe);

    })
    
    .then((newRecipe) => {console.log(`${newRecipe.title}`)}) //chain promise from return value
    .then (() => {
      mongoose.connection.close()
      console.log("You're done! The connection has closed")

    })
    .catch((err) => {
    throw new Error(err);})
    .catch(error => {
    console.error('Error connecting to the database', error);
  });



 
    