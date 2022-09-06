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
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2 - Create a recipe
    // Recipe
    //   .create(data[0])
    //   .then(console.log(data[0].title))
    //   .catch((error) => console.log(error));
    
    // Iteration 3 - Insert multiple recipes
    Recipe
      .insertMany(data)
      .then((recipes) => {
        recipes.forEach((recipe) => console.log(recipe.title));
      })
      .then(() => {
        // Iteration 4 - Update recipe
        Recipe
          .findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
          .then(console.log('Update Success'))
          .catch((error) => console.log(error));
      })
      .then(() => {
        // Iteration 5 - Remove a recipe
        Recipe
          .deleteOne({title: 'Carrot Cake'})
          .then(console.log('Remove Success'))
          .catch((error) => console.log(error));
      })
      .then(() => {
        // Iteration 6
        mongoose.connection.close(() => {
          console.log('Mongose connection closed');
          process.exit(0);
        })
      })
      .catch((error) => console.log(error));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
