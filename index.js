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
    return Recipe.deleteMany();
  })
  .then(() => {
  // Create a new recipe
  const newRecipe = {
  title: 'Spaghetti Bolognese',
  level: 'Amateur Chef',
  ingredients: [
  'spaghetti',
  'ground beef',
  'onion',
  'garlic',
  'tomato sauce',
  'red wine',
  'basil',
  'olive oil'
  ],
  cuisine: 'Italian',
  dishType: 'main_course',
  duration: 60,
  creator: 'John Doe'
  };
  // Save the recipe to the database
  return Recipe.create(newRecipe);
  })
  .then(recipe => {
    console.log('Recipe "' + recipe.title + '" has been added to the database');
  })
  .catch(error => {
  console.error('Error adding the recipe', error);
  });