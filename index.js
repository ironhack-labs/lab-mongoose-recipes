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
    const receta = {
      title:"Empanadas",
      level:"Easy Peasy",
      ingredients:[ "cebolla","masa de empanadas","carne picada","moron"],
      cuisine:"argentinian",
      dishType:"main_course",
      duration: 60,
      creator:"violeta",
      created:new Date(),
    }

    // receta es la constasnte que contiene todos los datos
    const newRecipe = new Recipe(receta);

    newRecipe
    .save() // esto la guarda
    .then((recipe) => {
      console.log(recipe.title);
    })
    
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



    