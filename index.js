const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

// Iteration 2
const recipeOne = {
  title: 'Salmorejo',
  level: 'Easy Peasy',
  ingredients: ['Tomatoes', 'Bread', 'Garlic', 'Vinegar', 'Olive Oil', 'Salt', 'Eggs', 'Serrano Ham'],
  cuisine: 'Spanish cuisine',
  dishType: 'Dish',
  image: "https://cdn-image.foodandwine.com/sites/default/files/1502722278/salmorejo-XL-RECIPE0917.jpg",
  duration: 45,
  creator: 'Erick Sicard',
  created: 01/28/2020
};

Recipe.create( recipeOne )
  .then( recipe => console.log('The user is saved and its value is: ', recipe.title) )
  .catch( err => console.log('An error happened: ', err) );


// Iteration 3
Recipe.insertMany( data )
    .then( recipes => recipes.map( recipe => console.log( recipe.title )))
    .catch( err => console.log('An error happened: ', err) );