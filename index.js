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
    return Recipe.create({
      title: "Costilar-de-popino",
      level: "Easy Peasy",
      ingredients: ["Popino Salvaje", "Cebollas", "Leche de Camello Macho", "Ajos"
      ],
      cuisine: "Master Ghetto Cheff",
      dishType: "breakfast",
      duration: 1,
      creator: "Mausque Cheff"
    })
  })
  .then(allNewRecipies => {
    console.log(`Todas estas recetas son patrocinadas por popino enterprises`, allNewRecipies.title)
    return Recipe.create([{ title: "Gato a la Bras", cuisine: "Ghetto Couisine" }, { title: "Noble Corazon de Buey", cuisine: "Ghetto Parrilla" }])
  })
  .then(updateRecipes => {
    console.log(`Estas recetas han sido actualizadas por Popino S.A`, updateRecipes.title)
    return Recipe.findOneAndUpdate({ duration: 1 }, { duration: 100 })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
