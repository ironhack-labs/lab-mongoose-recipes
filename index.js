const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { schema } = require('./models/Recipe.model');

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
    const arrabiata = {
      title: "Arrabiata",
      level: "Easy Peasy",
      ingredients: ["pasta", "olive oil", "garlic", "tomatoes", "chilli flakes", "parsley"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "./public/images/arrabiata.jpeg",
      duration: 20,
      creator: "Gordon Ramsey",
      created: "2022-01-01"
    }


    Recipe.create(arrabiata)
      .then(response => {
        console.log(response.title);
      })
      .catch((error) => {
        console.log("There was the following error creating the recipe:", error)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
