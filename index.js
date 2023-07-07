const mongoose = require('mongoose');

// Import the Recipe model from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/cooking';

// Connect to the "recipe-app" database
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Add the first recipe from the data file
    //return Recipe.create(data[0]);
  })
  .then(() => {
    // Add the first recipe from the data file
    return Recipe.create(data);
  })
  .then((createdRecipe) => {
    console.log('Created recipe:', createdRecipe);

    // Update the recipe "Rigatoni alla Genovese" with a new duration of 100
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log('Updated recipe:', updatedRecipe);

    // Find the recipe "Rigatoni alla Genovese"
    return Recipe.find({ title: 'Rigatoni alla Genovese' });
  })
  .then((foundRecipes) => {
    console.log('Found recipes:', foundRecipes);

    // Delete the recipe "Carrot Cake"
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((deletedRecipe) => {
    console.log('Deleted recipe:', deletedRecipe);

    // Close the database connection
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed.');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
