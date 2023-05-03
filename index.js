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
    return Recipe.create({ title: 'hello there', level: 'easy', ingredients: ['cheese', 'chocolate', 'salt'], cuisine: 'Asian', dishType: 'Dessert', image: 'hello there', duration: 5, creator: "anita", created: ('2020-03-01') })
      .then(newRecipe => console.log(newRecipe.title))
  })
  .then(arrayRecipes => {
    Recipe.create({ array })
    arrayRecipes.array.forEach(recipe => {
      console.log('Titulo de cada recete:', recipe.title)

    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




