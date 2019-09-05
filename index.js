const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    myRecipe();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Will create a new recipe below
function myRecipe () {
  Recipe.create({
    title: 'Fruit Salad',
    level: 'Easy Peasy',
    ingredients: ['2 cups cubed fresh pineapple', '2 tablespoons honey', '2 cups strawberries', '3 kiwi fruit, peeled and sliced', '3 bananas, sliced', '2 oranges, peeled and sectioned', '1/3 cup fresh lemon juice', '2 cups blueberries'],
    cuisine: 'General',
    dishType: 'Dessert',
    image: 'https://hips.hearstapps.com/hmg-prod/images/fruit-salad-horizontal-jpg-1522181219.jpg',
    duration: 25,
    creator: 'Unknown'
  })
    .then(Recipe => {
      console.log('Created my recipe: ', Recipe.title);
    })
    .catch(error => {
      console.log('Had an error creating my recipe');
    })
}