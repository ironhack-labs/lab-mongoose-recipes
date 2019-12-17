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

Recipe.create(data[0])
  .then(recipe => console.log(`A new recipe was created: ${recipe.title}`))
  .catch(err => console.log(`An error happend: ${err}`));

Recipe.insertMany(data)
  .then(recipesArr => {
    recipesArr.forEach(recipe => {
      console.log(`A new recipe was created: ${recipe.title}`)
    })
  })
  .catch(err => console.log(`An error happend: ${err}`));
