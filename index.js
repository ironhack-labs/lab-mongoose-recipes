const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = "mongodb://0.0.0.0:27017/recipe-app";

// Create new recipe variable
const newRecipe = {
  title: "Asian salad",
  level: "Easy Peasy",
  cuisine: "Thai",
  dishType: "other",
  duration: 35,
  creator: "Bocuse"
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })

  //iteration 2 start here
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   return Recipe.create(newRecipe)
  })
  // .then((recipe) => {
  //   console.log(Recipe);
  // })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
