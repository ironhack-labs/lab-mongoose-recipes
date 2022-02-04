const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { findOneAndUpdate } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {

    // Iteration 2
    return Recipe.create({
      title: 'Wurst',
      level: 'UltraPro Chef',
      cuisine: 'German'
    })
    .then(createdRecipe => {
      console.log('Recipe successfully created: ' + createdRecipe.title);
    });

  })
  .then(() => {

    // Iteration 3
    return Recipe.insertMany(data)
    .then(createdRecipes => {
      createdRecipes.forEach(recipe => console.log('Recipe successfully created: ' + recipe.title));
    });

  })
  .then(() => {

    // Iteration 4
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
    .then(recipeBeforeUpdate => {
      console.log('Recipe successfully updated: ' + recipeBeforeUpdate.title);
    });

  })
  .then(() => {

    // Iteration 5
    return Recipe.deleteOne({title: 'Carrot Cake'})
    .then(() => console.log('One document was sucessfully deleted'));

  })
  .then(() => {

    // Iteration 6
    mongoose.connection.close();

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });