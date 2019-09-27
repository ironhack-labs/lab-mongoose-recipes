const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create(
  {
    title: 'Cookie vegano',
    level: 'Easy Peasy',
    ingredients: ['alface', 'amor'],
    cuisine: 'Natural',
    dishType: 'Snack',
    duration: 10,
    creator: 'Gra & biel, with love'
  },
  function(err, recipe) {
    if (err) {
      console.log('An error happened:', err);
    } else {
      console.log('The user is saved and its value is: ', recipe);
    }
  }
);

Recipe.insertMany();

let promise = Recipe.insertMany(data);

Promise.all([promise])
  .then(values => {
    console.log('Recipes have been inserted');
    console.log(values);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
