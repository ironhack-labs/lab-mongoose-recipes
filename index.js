const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {


    Recipe
      .create({
        title: 'empanadillas',
        level: 'Easy Peasy',
        ingredients: ['masa', 'carne', 'sal'],
        cuisine: 'Colombia',
        dishType: 'other',
        duration: 30
      })
      .then(createdRecipe => console.log(createdRecipe.title))
      .catch(err => console.log('error', err))


    Recipe
      .insertMany(data)
      .then(createdRecipes => {
        createdRecipes.forEach(element => {
          console.log(element.title)
          return createdRecipes
        })
      })
      .then(allRecipes => {
        return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      })
      .then(recipe => {
        console.log('Eliminado correctamente')
        return Recipe.deleteOne({ title: "Carrot Cake" })
      })
      .catch(err => console.log('error', err))
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


