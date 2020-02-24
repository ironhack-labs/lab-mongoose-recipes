/* eslint-disable no-console */
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const myCheesecake = {
  title: 'Cheesecake',
  level: 'Amateur Chef',
  ingredients: ['butter', 'cream cheese', 'sugar', 'Graham Crackers', 'sour cream', 'vanilla', 'eggs', 'lemon juice'],
  cuisine: 'American',
  dishType: 'Dessert',
  duration: 60,
  creator: 'Michael',
};

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

Recipe.create(myCheesecake)
  .then((recipe) => console.log(`Added recipe: ${recipe.title}`))
  .catch((error) => console.log('An error happened while saving a new recipe: ', error));

Recipe.insertMany(data)
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(`Added recipe: ${recipe.title}`);
    });
  })
  .catch((error) => console.log('An error happened while saving a new recipe: ', error));

// method 1: success callback returns updated record
Recipe.findByIdAndUpdate('5e5441472b670a7ad22778d7', { $set: { duration: 100 } })
  .then((recipe) => console.log(`Updated recipe: ${recipe.title} duration: ${recipe.duration}`))
  .catch((error) => console.log('An error happened while updating a recipe: ', error));

// method 2: success callback does not return updated record
Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } })
  .then((success) => console.log(`Updated recipe. Success message: ${JSON.stringify(success)}`))
  .catch((error) => console.log('An error happened while updating a recipe: ', error));
