const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { modelName } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`CONECTADO PRRO: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({ title: 'Moca', level: 'Easy Peasy', ingredients: 'love', cuisine: 'Mexican', dishType: 'snack', image: "https://images.media-allrecipes.com/images/75131.jpg", duration: 60, creator: 'Marcello', created: 2021 - 01 - 01 })
      .then(newRecipe => console.log('La nueva receta es', newRecipe))
      .catch(error => console.log('Hubo un error:', error))
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create(data)
      .then(allRecipe => console.log('Todas las recetas son', allRecipe))
      .catch(error => console.log('Hubo un error:', error))
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(newRecipe => console.log('SUCCESS'))
      .catch(error => console.log('Hubo un error:', error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
