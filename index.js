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


const createRecipe =   Recipe.create(data[4])
        // .then(recipe => {console.log('This is the title of the new recipe: ', recipe.title)})
        // .catch(err => {console.log('An error happened: ', err)})

const insertRecipes = Recipe.insertMany(data)
//       .then(recipeArr => {
//       recipeArr.forEach(recipe => {console.log('The recipe title is: ' + recipe.title)})})
//       .catch(err => {console.log('An error occured here: ', err)});


const updateRecipe = Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
//       .then(recipe => {console.log('The duration was succesfully updated!')})
//       .catch(err => {console.log('An error occured here: ', err)});

const deleteRecipe = Recipe.deleteOne({title: 'Carrot Cake'})
      // .then(console.log('The Carrot Cake was successfully removed!'))
      // .catch(err => {console.log('An error occured here: ', err)});

Promise.all([createRecipe, insertRecipes, updateRecipe, deleteRecipe])
      .then(res => {
        console.log(res);
        mongoose.connection.close();
      })
      .catch(err => {console.log('ERROR something is wrong!' + err)})