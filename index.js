require('dotenv').config()
require('./configs/db.config')

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');



Recipe.deleteMany()
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((recipes) => {
    recipes.forEach((recipe) => console.log(`Recipe ${recipe.title} has been created`))
    
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese'},
      { duration: 100 },
      { new: true }
      )
  })
  .then((recipeUpdated) => {
    console.log(`Recipe ${recipeUpdated.title} updated successfully`)
    
    return Recipe.deleteOne({ title : 'Carrot Cake'})
  })
  .then(() => {
    console.log('Recipe removed from database')
  })
  .catch(error => {
    console.error('Error sending the recipe', error);
  })
  .finally(() => {
    mongoose.connection.close(() => {
      console.log('Disconnected from database')
      process.exit(0)
    })
  })
