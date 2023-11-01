const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const databaseName = 'recipesDB'
const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipesDB';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Recipe
    //   .create({ title: 'Huevos Rellenos', level: 'Easy Peasy', ingredients: ['huevos', 'mayonesa', 'tomate'], cuisine: 'spanish', dishType: 'snack', image: "https://elronqueo.es/wp-content/uploads/2021/10/Receta-de-huevos-rellenos-de-atun-El-Ronqueo.jpg", duration: 100, creator: 'Arzak' })
    //   .then(newRecipe => console.log('La nueva receta es', newRecipe.title))
    //   .catch(err => console.log('da error', err))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// Recipe
//   .create({ title: 'Huevos Rellenos', level: 'Easy Peasy', ingredients: ['huevos', 'mayonesa', 'tomate'], cuisine: 'spanish', dishType: 'snack', image: "https://elronqueo.es/wp-content/uploads/2021/10/Receta-de-huevos-rellenos-de-atun-El-Ronqueo.jpg", duration: 100, creator: 'Arzak' })
//   .then(newRecipe => console.log('La nueva receta es', newRecipe.title))
//   .catch(err => console.log('da error', err))

Recipe
  .insertMany(data)
  .then(newRecipe2 => console.log('Se han creado las siguientes recetas', newRecipe2.title))
  .catch(err2 => console.log('Esto da error', err2))


