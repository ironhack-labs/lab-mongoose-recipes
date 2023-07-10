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
  .then(x => {
    if(mongoose.connection.readyState===1) {
      return Recipe.create({
        title: 'Hamburger',
        level: 'Easy Peasy',
        ingredients: ['steak', 'bread', 'tomatoes', 'cheddar', 'pickles'],
        cuisine: 'American',
        dishType: 'main_course',
        image: 'https://img.cuisineaz.com/660x660/2013/12/20/i9380-hamburger.webp',
        duration: 60,
        creator: 'Chef Hadrien',
        default: Date.now
      })
      .then(recipe => console.log(recipe.title))
    }
  })
  .then(x => {
    return Recipe.insertMany(data)
    .then(recipes => {
      recipes.forEach(x => console.log(x.title))
    })
  })
  .then(x => {
    return Recipe.updateOne({title: `Rigatoni alla Genovese`}, {duration: 100})
    .then(x => console.log('Recipe updated successfully'))
  })
  .then(x => {
    return Recipe.deleteOne({title: `Carrot Cake`})
    .then(x => console.log('Recipe deleted successfully'))
  })
  .then(x => {
    mongoose.connection.close()
    console.log('Connection closed.')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });