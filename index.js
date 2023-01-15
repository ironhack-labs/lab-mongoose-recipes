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
    // Run your code here, after you have insured that the connection was made
  
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  Recipe.model.create(data, (error, recipe) => {
    if(error) {
      console.log('An error happened:', error);
      return;
    }
    console.log('The recipe is saved and its value is: ', recipe);
  });

  Recipe.model.create(data)
  .then(Recipe => console.log('The recipe is saved and its value is: ', Recipe))
  .catch(error => console.log('An error happened while saving a new recipe:', error));


