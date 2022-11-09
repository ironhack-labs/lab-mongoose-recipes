const mongoose = require('mongoose');
const express = require('express');

const app = express()
const recipes = require("./data.json")



// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

Recipe.create({ title: "macarrones", ingredients: ["tomatito", "pasta"], cuisine: "italian", level: "Easy Peasy", dishType: "snack", duration: 1 })
Recipe.insertMany(recipes)
  .then(recipesCreated => {
    recipesCreated.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } }, { new: true })
  }


  )
Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
  console.log("Hemos borrado algo")
})
  .catch((err) => console.log(err))

app.listen(5005, () => console.log('listener on port 5005'));
