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
    Recipe.insertMany(data)
    .then(recipe => console.log('title'))
    Recipe.findByIdAndUpdate('635d0a7d4d7cfdc3d4d4a842', {duration: 100})
    .then(recipe => console.log('Duration changed!'))
    Recipe.deleteOne({title: 'Carrot Cake'})
    .then(recipe => console.log('86 Carrot Cake!'))
    })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
