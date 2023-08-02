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
    Recipe
      .create({ title: "donuts", level: "Amateur Chef", ingredients: ["harina", "agua", "azucar", "huevos", "chocolate"], cuisine: "american", dishType: "snack", duration: 15, creator: "us" })
      .then(createdRecipe => {
        console.log('el donut esta aqui', createdRecipe)
      })
      .catch(err => {
        console.log('ERROR', err)
      })
    // Run your code here, after you have insured that the connection was made
  })
  .then(() => {
    Recipe
      .insertMany(data)
      .then(dataBase => {
        console.log('la data esta aqui', dataBase)
      })
      .catch(err => {
        console.log('ERROR', err)
      })
    // Run your code here, after you have insured that the connection was made
  })
  .then(() => {
    Recipe
      .findByIdAndUpdate('64ca5a04fa441cb8bc187b14', { duration: 100 }, { new: true })
      .then(rigatoniUpdate => {
        console.log('rigatoni succes', rigatoniUpdate)
      })
      .catch(err => {
        console.log('ERROR', err)
      })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
