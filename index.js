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

Recipe.create({
  title:'kebab',
  level:'Easy Peasy',
  ingredients: ['sheep','garlic','cumin','onions'],
  cuisine:'Chez marhmood',
  dishType : 'Breakfast',
  image:"default",
  duration:5,
  creator:'Mc Zukberger',
  created:'2020-12-25',
})
console.log(Recipe.title);