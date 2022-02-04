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
    return Recipe.deleteMany()
  })
  .then(() => {
    // Iteration 2: Insert single recipe
    return Recipe.create({
      title: 'Wurst',
      level: 'UltraPro Chef',
      cuisine: 'German'
    });
  })
  .then((createdRecipe) => {
    // Iteration 2: Log single recipe
    console.log('Recipe successfully created: ' + createdRecipe.title);
  })
  .then(() => {
    // Iteration 3: Insert multiple recipes
    return Recipe.insertMany(data);
  })
  .then((createdRecipes) => {
    // Iteration 3: Log multiple recipes
    createdRecipes.forEach(recipe => console.log('Recipe successfully created: ' + recipe.title));

    // Iteration 4: Update one document
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100});
  })
  .then((recipeBeforeUpdate) => {
    // Iteration 4: Log success message
    console.log('Recipe successfully updated: ' + recipeBeforeUpdate.title)

    // Iteration 5: Delete one document
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(() => {
    // Iteration 5: Log success message
    console.log('One document was sucessfully deleted')
  })
  .then(() => {
    // Iteration 6: Close connection
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
