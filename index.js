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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
  // Create a new recipe
  const newRecipe = {
  title: 'Spaghetti Bolognese',
  level: 'Amateur Chef',
  ingredients: [
  'spaghetti',
  'ground beef',
  'onion',
  'garlic',
  'tomato sauce',
  'red wine',
  'basil',
  'olive oil'
  ],
  cuisine: 'Italian',
  dishType: 'main_course',
  duration: 60,
  creator: 'John Doe'
  };
  // Save the recipe to the database
  return Recipe.create(newRecipe);
  })
  .then(recipe => {
    console.log('Recipe ' + recipe.title + ' has been added to the database');
  })
  .catch(error => {
  console.error('Error adding the recipe', error);
  });
  const recipeDetails = {
    title: 'Recipe 1',
    level: 'Easy Peasy',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    cuisine: 'Cuisine 1',
    dishType: 'main_course',
    duration: 30,
    creator: 'Creator 1'
  };
  
  mongoose
    .connect(MONGODB_URI)
    .then(x => {
      console.log(`Connected to the database: "${x.connection.name}"`);
      return Recipe.create(recipeDetails);
    })
    .then(recipe => {
      console.log(`Recipe "${recipe.title}" has been added to the database`);
    })
    .catch(error => {
      console.error('Error adding the recipe to the database', error);
    });
    mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 }}, { new: true });
  })
  .then(recipe => {
    console.log(`The recipe "${recipe.title}" has been updated successfully`);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error(error);
    mongoose.connection.close();
  });
  mongoose.connection
  .close()
  .then(() => {
    console.log('The database connection has been closed');
  })
  .catch(err => {
    console.error(`An error occured while closing the database connection: ${err}`);
  });