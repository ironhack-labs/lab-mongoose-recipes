const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    //Remove all existing recipes
    return Recipe.deleteMany()
  })
  .then(() => {
    console.log('All Recipes removed.');
    // Insert the recipes from data.json
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(`Inserted recipe: ${recipe.title}`);
    });
    //Update the rigatoni duraton
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration:100}, {new:true})
  })
  .then(recipe => {
    console.log(`Updated recipe: ${recipe.title}, Duration: ${recipe.duration}`);
    //Delete Carrot Cake
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Carrot Cake recipe deleted.');
    // Close the DB connection when done
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
