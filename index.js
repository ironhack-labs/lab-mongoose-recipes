const mongoose = require('mongoose');

require("./config/db.config");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
    .then(() => console.log('Database has been cleared')) 
  /*.then(() => {
    Recipe.create(data[0])
    .then(createdRecipes => console.log(createdRecipes.title))
    .catch(err => console.log(err))
    // Run your code here, after you have insured that the connection was made
  })*/
  .then(() =>{
   return Recipe.create(data)
  })
  .then(createdRecipes => {
    createdRecipes.forEach(e => console.log(e.title))
  })
  .then(result => {
    console.log(result)
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { duration: 100 }, { new: true })
  })
  .then(recipe => {
    console.log(recipe)
    console.log(`Recipe ${recipe.duration} has been updated with success`)
    return Recipe.findOneAndDelete({title: "Carrot Cake"})  
  })
  .then(deletedRecipe => console.log(`Recipe ${deletedRecipe.title} has been deleted`))
  .then(() => {
    return Recipe.countDocuments()
  })
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close())
})
  
