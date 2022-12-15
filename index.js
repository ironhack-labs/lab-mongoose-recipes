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
    // iteration 2: create a recipe
    const newRecipe = {
      title: "Spaghetti alla Carbonara",
      level: "Easy Peasy",
      ingredients: [
        "350g of spaghetti",
        "200g of guanciale",
        "4 whole medium eggs (1 egg per serving)",
        "100g of grated Pecorino Romano cheese",
        "Ground black pepper",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 25,
      creator: "Chef Thalita",
    }

    return Recipe.create(newRecipe);
  })
  .then((newRecipe) => {
    console.log(newRecipe)
  })
  .then(() => {
    return Recipe.insertMany(data) // iteration 3: insert multiple recipes
  })
  .then((data) => {
    data.forEach(recipe => {
      console.log(recipe.title)
    })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: '100'}) //iteration 4: update recipe
  })
  .then(() => {
    console.log('Updated the duration of Rigatoni alla Genovese')
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"}) //iteration 5: remove carrot cake
  })
  .then(() => {
    console.log("Carrot Cake has been deleted.")
  })
  .then(() => {
    mongoose.disconnect(); //iteration 6: close the database
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });