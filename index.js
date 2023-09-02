const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Iteration 2 - Create a recipe

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((resp) => {
    console.log(`Connected to the database: "${resp.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  
 // .then(() => {
 //   Recipe.create(data)
//   .then((newRecipe) => console.log(`Added recipe: ${newRecipe.title}`))
//  })
  .then(() => {
    Recipe.insertMany(data)
    .then((newRecipe) => {
      newRecipe.forEach((recipe) => {
        console.log(`Added recipe: ${recipe.title}`);
      });
    })
    Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100},
      {new: true}
    );
    Recipe.deleteOne(
      Recipe.findByIdAndRemove("64f3b72daf36ec1cc33f1caa")
    );
  })

  .then((updatedRecipe) => {
    console.log(`Updated recipe: ${updatedRecipe.title} - Duration set to ${updatedRecipe.duration}`);
  })

  .then((deleteRecipe) => {
    console.log(`Deleted recipe: ${deleteRecipe} - deleted`);

  mongoose.connection.close();
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });