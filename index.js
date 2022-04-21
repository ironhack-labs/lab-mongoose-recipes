const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const { modelName, insertMany } = require('./models/Recipe.model');

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
    async function insertRecets(){
      try{
        const NewRecet = await Recipe.create({
          title:"Omelette au fromage",
          level:"UltraPro Chef",
          ingredients:["huevos","queso"],
          cuisine:"Francesa",
          dishType: "breakfast",
          duration: 5,
          creator: "Dexter",
          created:21/04/2022
        })
      }
    }
    })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
