const mongoose = require('mongoose');
const express = require("express");
const app = express()
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    // Run your code here, after you have insured that the connection was made
    let myRecipe = {
    title : "Torta",
    level: "Amateur Chef",
    ingredients : "Palta",
    cuisine : "High",
    dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration : 10,
    creator : "Paris Hilton",
      created: "2023-09-03"
    }
    return Recipe.create(myRecipe)   
  })
  .then(result => {
    console.log(`Recipe created: ${result}`)
    return Recipe.insertMany(data)
  })

  //   The same code as above but with a Promise version
  //   Recipe.create(myRecipe)
  //     .then(user => console.log('The recipe is saved and its value is: ', user))
  //     .catch(error => console.log('An error happened while saving a new user:', error));

  // })

  .then(result => {
    console.log(`Created: ${result.length} recipes`);
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })
  .then(result => {
    console.log(`Update ${result.title} and new duration is: ${result.duration}`);
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then((result) => {
    console.log("This recipe was deleted:", result)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close())

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });



