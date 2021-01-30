require('dotenv').config()

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data'
const data = require('./data/data');
const personalData = require('./data/personalRecipe');

// Connection to the database "recipe-app"
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {

    Recipe.create(personalData)
    .then(recipe => console.log('The recipe is saved and its value is: ', recipe.title))
    .catch(error => console.log('An error happened while saving a new recipe:', error));

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
