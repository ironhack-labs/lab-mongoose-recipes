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
    
    //Iteration 2:
    
    //const recipe = new Recipe({ 
    //  title: "Súper Banana Bread",
    //  level: "Easy Peasy",
    //  ingredients: ["3 riped bananas","76g butter", "1/2 teaspoon baking soda", "1 pinch salt", "100gr sugar", "1 large egg, beaten", "1 teaspoon vanilla extract", "205g all-purpose flour"],
    //  cuisine: "universal",
    //  dishType: "breakfast",
    //  duration: 60,
    //  creator: "Rick"
    //});

    //recipe
    //  .save()
    //  .then(newRecipe => console.log(`A new recipe is created: ${newRecipe.title}!`))
    //  .catch(err => console.log(`Error while creating a new recipe: ${err}`));

    //Recipe
    //  .create(recipe)
    //  .then(newRecipe => console.log(`A new recipe is created: ${newRecipe.title}!`))
    //  .catch(err => console.log(`Error while creating a new recipe: ${err}`));

    //Iteration 3

    //Recipe
    //  .insertMany(data)
    //  .then(newRecipes => newRecipes.forEach((newRecipe) => console.log(`A new recipe is created: ${newRecipe.title}!`)))
    //  .catch(err => console.log(`Error while creating a new recipe: ${err}`));

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
