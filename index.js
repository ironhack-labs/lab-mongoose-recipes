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
    //return Recipe.deleteMany()
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
    //  .catch(err => console.log(`Error while creating the new recipes: ${err}`));

    //Iteration 4

    //Recipe
    //  .findOneAndUpdate({ title: "Carrot Cake" }, { duration: 100 }) //return the changed object with the values of before the change
    //  .then(updatedRecipe => console.log(`A new recipe is updated: ${updatedRecipe.title}! The duration was: ${updatedRecipe.duration}`))
    //  .catch(err => console.log(`Error while updating the recipe: ${err}`));
    
    //Iteration 5

    //Recipe
    //  .deleteOne({title: "Carrot Cake"})
    //  .then(deletedRecipe => console.log(`The recipe is deleted!`))
    //  .catch(err => console.log(`Error while deleting the recipe: ${err}`));

    //Iteration 6
    mongoose.connection.close(() => console.log("Disconnected from the database"));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
