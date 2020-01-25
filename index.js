const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });


//ITERATION 2: Correct???
recipe.create({
    recipe
  })
  .then(recipe => console.log(`Title of Recipe: ${recipe.title}`, recipe))
  .catch(error =>
    console.log('An error occured while saving your new recipe:', error)
  );


//ITERTION 3:
recipe.insertMany({
    recipe
  })
  .then(recipe => console.log(`Title of Recipe: ${recipe.title}`, recipe))
  .catch(error =>
    console.log('An error occured while saving your new recipe:', error)
  );