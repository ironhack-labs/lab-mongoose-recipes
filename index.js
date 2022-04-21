const mongoose = require('mongoose');

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
    const newRecipe = {
      title: 'Black Pudding',
      level: 'Easy Peasy',
      cuisine: "Scottish"
    } 
    return Recipe.create(newRecipe)
  })
  .then((newestRecipe) => {
    console.log("A new receipe has been added called " + newestRecipe.title)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
