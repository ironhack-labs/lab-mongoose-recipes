const mongoose = require('mongoose');

require("./config/db.config")

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
  .then(() => console.log('Database has been cleared'))
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(data[0])
      .then(recipe => console.log("The recipe is saved and its name is: ", recipe.title))
      .catch(error => console.log("An error happened while saving a new recipe: ", error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
})

