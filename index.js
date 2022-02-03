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
    // Iteration 2
    return Recipe.create({
      title: 'Roasted Salmon with White Wine Sauce',
      level: 'Easy Peasy',
      ingredients: ['1 (1 1/2-pound) salmon fillet', '1 tablespoon unsalted butter', '2 teaspoons all-purpose flour', '1 cup dry white wine', '1 tablespoon chopped fresh chives'],
      cuisine: 'Mediterranean',
      dishType: 'main_course',
      duration: 30,
      creator: 'Hans Peter',
      created: Date.now(),
    })
  })
  // Iteration 3
  .then(() => {
    const recipes = Recipe.insertMany(data)
    return recipes
      .then((recipes) => {
        recipes.forEach((recipe) => {
          console.log(`Recipe added: ${recipe.title}`);
        })
      })
  })
  // Iteration 4
  .then(() => {
    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: "100" })
      .then(recipe => (console.log(`Succesfully updated ${recipe.title}`)))
  })
  // Iteration 5
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(recipe => {
        console.log('Recipe deleted')
      })
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
