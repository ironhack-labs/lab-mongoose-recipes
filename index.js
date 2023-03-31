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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  Recipe.create({
    title: 'Pasta Carbonara',
    level: 'Easy Peasy',
    ingredients: ['spaghetti', 'bacon', 'eggs', 'parmesan cheese', 'black pepper', 'salt'],
    cuisine: 'Italian',
    dishType: 'main_course',
    duration: 30,
    creator: 'Chef Giovanni',
  })
    .then(recipe => {
      console.log(`New recipe added: ${recipe.title}`);
      return Recipe.insertMany(data);
    })
    .then(recipes => {
      recipes.forEach(recipe => {
        console.log(`Inserted recipe: ${recipe.title}`);
      });
      
  })
 .catch(error => {
      console.error(error);
    });

    