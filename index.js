const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones

    const recipe1 = {
      title: 'pizza',
      level: 'Easy Peasy',
      ingredients: ['tommato', 'mashroom', 'cheese'],
      cuisine: 'top pizza',
      dishType: 'main_course',
      duration: 30,
      creator: 'berkay',
    };

    //Iteration 2 Code
    return Recipe.create(recipe1);
    //return Recipe.deleteMany();
  })
  .then((recipeCreatedInDB) => {
    // Run your code here, after you have insured that the connection was made
    //Iteration 2 Console.log
    console.log(`Iteration 2: ${recipeCreatedInDB}`);
    //Iteration 3 Code
    return Recipe.insertMany(data);
  })
  .then((insertedData) => {
    //Iteration 3 Console.log
    console.log(`Iteration 2: ${insertedData}`);
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
