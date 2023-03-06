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
  .then((recipe) => {
    console.log(recipe)
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //Iteration 3 //INsert multiple recipes//

  Recipe.insertMany ([
    {title: ""}
  ])
  .then(createRecipes => console.log(createdRecipes))
  .catch(err => console.log(err))

  //Iteration 4 //Update the File

  Recipe.findOneAndUpdate ({duration: 100})
  .then(recipe => console.log(recipe))
  .catch(err => console.log(err))



