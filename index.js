const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => { 
    return Recipe.create(
      {title: 'Croquetas', 
      cuisine: 'Spanish'
      })
      .then((newRecipe) => {console.log(newRecipe.title)})
      .catch(error => {console.log(error)});
    })
    .then(() => {
      return Recipe.insertMany(data)
      .then(allRecipes => {allRecipes.forEach(recipe => {
        console.log(recipe.title)}
      )})
      .catch(error => {console.log(error)})

    })
    .then(() => {
      return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100},)
        .then(console.log("Now the Rigatoni are properly cooked"))
    }

    )
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
