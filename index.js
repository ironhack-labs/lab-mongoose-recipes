const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
  
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  // iteratión 2 - insert one recipe
  .then(() => {
    

    Recipe.create({
      "title": "Healthy oat chocolate cake",
      "level": "Easy Peasy",
      "ingredients": [
        "1 cup oats",
        "2 eggs",
        "2 bananas",
        "1/4 cup coconut oil",
        "1/4 vanilla esence",
        "3 tablespoons minced garlic",
        "1/4 cup yeast",
        "100 grams chocolate 100%",
        "apricot to decorate",
      ],
      "cuisine": "French",
      "dishType": "snack",
      "image": "",
      "duration": 35,
      "creator": "Chef Nina",
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })


  // Iteration 3 - Insert multiple recipes 
  .then  (() => {
    return Recipe.insertMany(data)
  })
  .then((recipes) => {
    recipes.forEach(recipe => {
      console.log(recipe.title)
    });
  })