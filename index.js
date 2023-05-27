const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

mongoose.set('strictQuery', false); //solving my issue with mongoose

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const myNewRecipe = new Recipe({
      title: 'Delicious Pancakes',
      level: 'Easy Peasy',
      ingredients: ['1 cup flour', '1 cup milk', '1 egg', '2 tbsp sugar', '1 tsp baking powder'],
      cuisine: 'International',
      dishType: 'breakfast',
      duration: 20,
      creator: 'John Doe',
    });
      return myNewRecipe.save();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
