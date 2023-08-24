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
  const ourRecipe = {
    title: "pasta salad",
    level: "Easy Peasy",
    ingredients: ["pasta", "tomato", "olives", "lettuce", "mozarella"],
    cuisine: "Italian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 30,
    creator: "Merna & Hanna", 
  }
  console.log(ourRecipe.title)
  return Recipe.create(ourRecipe)
  })
  .then(() => {
    console.log("Your salad is ready")
  })
  .then(() =>{
    console.log(data.title)
    return Recipe.insertMany(data)
  })
  .then(() =>{
    const multipleRecipes = JSON.parse(data);
    multipleRecipes.forEach((recipe) => {
      console.log("Recipe's title: ", recipe.title)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


