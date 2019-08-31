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

const newRecipe = new Recipe({ title: 'Sushi', cuisine: 'Japanese' });

// newRecipe
//   .save()
//   .then(newRecipe => console.log(`A new recipe is created: ${newRecipe}!`))
//   .catch(err => console.log(`Error while creating a new recipe: ${err}`));
// console.log(newRecipe)

Recipe.insertMany(data)
  .then(newRecipe => console.log(`A new recipe is created: ${newRecipe}!`))
  .catch(err => console.log(`Error while creating a new recipe: ${err}`));;

// for (let dataPoint of data) {
//   const newRecipe = new Recipe(dataPoint);

//   newRecipe.save()
//     .then(newRecipe => console.log(`A new recipe is created: ${newRecipe}!`))
//     .catch(err => console.log(`Error while creating a new recipe: ${err}`));
// }