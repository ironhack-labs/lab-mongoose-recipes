const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
      .then((createdRecipes) => {
        console.log('New recipes created:');
        createdRecipes.forEach((recipe) => {
          console.log(recipe.title);
        });
        // Update the duration for "Rigatoni alla Genovese"
        return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
      })
      .then(() => {
        console.log('Recipe updated successfully');
        // Remove the "Carrot Cake" recipe
        return Recipe.deleteOne ({ title: 'Carrot Cake'});
      })
      .then(() => {
        console.log('Recipe removed successfully');
        mongoose.connection.close();
        console.log('Database connection closed.')
      })
      .catch((error) => {
        console.error('Error creating recipes:', error);
        mongoose.connection.close();
        console.log('Database connection closed.');
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });