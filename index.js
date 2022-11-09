const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');
const { create, findByIdAndUpdate } = require('./models/Recipe.model');

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
    // Recipe
    //   .create({
    //     title: "Garbanzos", level: "Easy Peasy", ingredients: ["garbanzo", "pollo", "chorizo"], cuisine: "modern", dishTypes: "soup", image: "https://images.media-allrecipes.com/images/75131.jpg", duration: 4, creator: "Teresa",
    //   })
    //   .then(recipe => { console.log(recipe) })
    //   .catch(err => console.log(err))

    Recipe
      .create(data)
      .then(data => { console.log(data) })
      .catch(err => console.log(err))

      .findByIdAndUpdate("636bc6ef79e77cd07aacae59", { duration: 100 })
      .then(recipe => { console.log(recipe) })
      .catch(err => console.log(err))




  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

