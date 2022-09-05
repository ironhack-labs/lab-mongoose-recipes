const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://ansimil:MGiPiehg1909@cluster0.bhcdubl.mongodb.net/Recipes';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log('Step 1');
    return Recipe.deleteMany()
    })

  Recipe.insertMany(data)
  .then(createdRecipe => {
    console.log('Step 2');

    //createdRecipe.forEach(recipe => console.log(recipe.title))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  
  Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { duration: 100}, {new: true})
  .then(updatedRecipe => {
    //console.log(updatedRecipe)
    console.log('Step 3');

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  Recipe.deleteOne({ title: 'Carrot Cake'})
  .then(foundRecipe => {
    //console.log(foundRecipe)
    console.log('Step 4');

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
