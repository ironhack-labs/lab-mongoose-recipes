const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  // Iteration 2
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

    return newRecipe.save() // esto la guarda
    // Run your code here, after you have insured that the connection was made
  })

// Iteration 3 - Insert multiple recipes
  .then((recipe) => {
    console.log(recipe.title);
    // hacemos el return asi lo tenemos al mismo nivel
    return Recipe.insertMany(data)
  })
  .then(all => {
    all.forEach((recipes) => {
      console.log(recipes.title)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

