const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Iteration 1 | Recipe Schema - done in Recipe.js

//Iteration 2 | Create a recipe
Recipe.create({
  title: 'My first recipe',
  level: 'Easy Peasy',
  ingredients: ['Salt', 'onions', 'oil', 'rice', 'water'],
  cuisine: 'Ash',
  dishType: 'Breakfast',
  duration: 5,
  creator: 'Ashrafzhon',
})
  .then(myRecipe => console.log(`Success: ${myRecipe}`))
  .catch(err => console.log(err.message));

// Iteration 3 | Insert Many recipes
