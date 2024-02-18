const mongoose = require("mongoose");

require('dotenv').config();
require('./configs/db.config');

const Recipe = require('./models/Recipe.model')
const recipeData = require('./data')

console.info('Cleaning recipes collection');
Recipe.deleteMany()
  .then(() => Recipe.create({title: 'Paella', cuisine: 'Spanish'}))
  .then((recipe) => console.log(`${recipe.title} recipe created`))
  .catch(error => {
    console.error('Error sending the recipe', error);
  });

Recipe.create(recipeData)
  .then((recipes) => {
    recipes.forEach((recipe) => { console.log(recipe.title)})
  })
  .catch(error => {
    console.error('Error sending multiple recipes', error);
  });

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' },{ duration: 100 })
  .then(() => console.log('Updated!'))
  .catch((error) => console.error('Error updating the recipe', error))

Recipe.deleteOne({ title: 'Carrot cake' })
  .then(() => {
    console.log('Recipe deleted!');
    mongoose.connection.close(() => {console.log("Finished")});
  })
  .catch((error) => console.error('Error deleting the recipe', error))