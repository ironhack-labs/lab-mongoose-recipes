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
  .then(async () => {
    try {
      const recipe = await Recipe.create({ title: 'Spaghetti', cuisine: 'Italian' });
      return console.log('Recipes imported:', recipe.title);
    } catch (error) {
      return console.log('Error happened:', error);
    }
  })
  .then(async () => {
    try {
      const recipes = await Recipe.insertMany(data);
      recipes.forEach(recipe => {
        console.log('Recipe saved:', recipe.title);
      });
    } catch (error) {
      return console.log('Error happened:', error);
    }
  })
  .then(async () => {
    try {
      const recipeUpdated = await Recipe.findOneAndUpdate(
        { "title": "Rigatoni alla Genovese" },
        { "duration": 100 },
        { new: true }
      );
      return console.log('Recipe updated:', recipeUpdated);
    } catch (error) {
      return console.log('Error happened:', error);
    }
  })
  .then(async () => {
    try {
      const recipeDeleted = await Recipe.deleteOne(
        { "title": "Carrot Cake" }
      );
      return console.log('Recipe deleted:', recipeDeleted);
    } catch (error) {
      return console.log('Error happened:', error);
    }
  })
  .then(async () => {
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
