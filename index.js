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

    Recipe.create({
      title: "Spaghetti alla Carbonara",
      level: "Easy Peasy",
      ingredients: [
        "350g of spaghetti",
        "200g of guanciale",
        "4 whole medium eggs (1 egg per serving)",
        "100g of grated Pecorino Romano cheese",
        "Ground black pepper",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 25,
      creator: "Italians from within Rome",
    })
    .then(recipe => console.log(recipe.title))
    .catch(error => console.log(error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
