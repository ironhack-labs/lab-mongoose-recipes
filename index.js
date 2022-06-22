const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { create } = require('./models/Recipe.model');


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
    return Recipe.create({
      title: 'Pizza',
      level: 'Easy Peasy',
      ingredients: ['harina', 'huevo', 'aceitunas', 'mozzarela', 'tomate'],
      cuisine: 'italian',
      dishType: 'main_course',
      duration: 40,
      creator: 'Victor & Leon'
    })
  })
  .then(newRecipe => {
    // console.log(newRecipe.title)
  })
  .then(() => {
    data.forEach(element => {
      // console.log(element)
      Recipe.create(element)
    });
  })
  .then(() => {
    return Recipe
    .findOne({ name: "Rigatoni alla Genovese" })
      .then(upRecipe => {
        console.log(upRecipe)

  })})
  // .then(upRecipe => {
  //   console.log(upRecipe)
  //   // upRecipe.updateOne({duration: 220}, {duration: 100})
  // })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
