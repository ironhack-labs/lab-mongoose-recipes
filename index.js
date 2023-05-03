const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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

    return Recipe.create({ title: 'los noodles de Manu', level: 'Easy Peasy', ingredients: ['water', 'yatekomo'], cuisine: "hola", dishType: "snack", duration: 5, creator: "Manu" })

  })
  .then(() => {
    return Recipe.insertMany(data)

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });








