const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let newObj = {
  title: 'Bolo de Caju',
  level: 'UltraPro Chef',
  ingredients: 'flour, caju, eggs, milk and lucky',
  cuisine: 'North of Brazil',
  dishType: 'Other',
  duration: 2,
  creator: 'Unknown',
};

// Recipe.create(newObj)
//   .then(e => console.log(e))
//   .catch(error => console.error('Error', error));


Recipe.insertMany(data)
  .then(e => console.log(e.title))
  .catch(error => console.error('Error', error));