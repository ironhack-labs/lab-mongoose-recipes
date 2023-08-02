const mongoose = require('mongoose');



// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
require('./data.json')

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "pisa",
      level: "UltraPro Chef",
      ingredients: ["tomatoe", "peperonni", "cheese"],
      cuisine: "italian",
      dishType: "breffast",
      duration: 23,
      creator: "Chef Pepito"
    })
  })
  .then((recipeOne) => {

    console.log(recipeOne.title)
  })
  .then(() => {

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
