const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const myRecipe = require('./myRecipe.json')

const MONGODB_URI = 'mongodb+srv://renatainojosa:ironhack123@cluster0.zslufxg.mongodb.net/recipe-app?retryWrites=true&w=majority';

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
    Recipe.create(myRecipe)
    console.log(myRecipe.title)
  })
  .then(() => {
    Recipe.create(data)
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].title)
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
