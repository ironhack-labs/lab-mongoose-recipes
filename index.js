const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

console.log(Recipe)

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
    // const newRecipe = data[0]
    // return Recipe.create(newRecipe);

    return Recipe.insertMany(data)
  })
  .then(recipes => {
    recipes.forEach(recipe => console.log(recipe.title))
    return recipes})
  
    .then(recipes => {
      Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {duration: 100}, {new: true})
      return recipes
    })
    .then(recipes => console.log(recipes))
    
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
