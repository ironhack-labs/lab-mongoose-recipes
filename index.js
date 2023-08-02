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
    return Recipe.create({
      title: 'Macarrones con Queso', level: 'Easy Peasy',
      ingredients: ["50gr Macarrones", "tomate frito"], cuisine: "International", dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg", duration: 30, creator: "Chef Alberto"
    })

  })
  .then(createdRecipe => {
    console.log(createdRecipe.title)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
