

  const mongoose = require('mongoose');
require('dotenv').config();
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = process.env.MONGO_URI;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Create a new recipe and save it to the database
    const newRecipe = {
      title: 'Chocolate Cake',
      level: 'Amateur Chef',
      ingredients: ['chocolate', 'sugar', 'flour'],
      cuisine: 'dessert',
      dishType: 'dessert',
      duration: 30,
      creator: 'Chef John'
    };
    return Recipe.create(newRecipe);
  })
  .then((newRecipe) => {
    console.log(`New recipe "${newRecipe.title}" created successfully!`);

    // Insert multiple recipes from data.json to the database
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    // iterate through the array of inserted recipes and log the title of each recipe to the console
    recipes.forEach((recipe) => {
      console.log(`"${recipe.title}" added to the database!`);
    });

    // Update the duration of the Rigatoni alla Genovese recipe
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log('Successfully updated Rigatoni alla Genovese!');
    // Delete the Carrot Cake recipe from the database
    return Recipe.deleteOne({title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Successfully deleted Carrot Cake recipe!');
    // Close the database connection
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });