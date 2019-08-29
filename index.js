const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
    name: 'Alice',
    title: 'New Recipe',
    creator: 'Niklas',
    age: 27,
  })
  .then(user => {
    console.log('The user is saved and its value is: ', user)
  })
  .catch(err => {
    console.log('An error happened:', err)
  });

// Recipe.insertMany(data)
//   .then(data => {
//     console.log('blabla', data)
//   })
//   .catch(err => {
//     console.log('an error happened:', err)
//   })