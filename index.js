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
    // Run your code here, after you have insured that the connection was made
    //Iteration 2
    const recipeOne = {
      title: "Curry Chicken",
      level: "UltraPro Chef",
      ingredients: ["curry sauce", "chicken", "rice", "basil", "pepper", "salt", "onion", "carrots"],
      cuisine: "India",
      dishType: "main_course",
      image: "/public/images/currychicken.jpeg",
      duration: 60,
      creator: "Jamie Oliver",
      created: '2023-06-01',
    }
    return Recipe.create(recipeOne);
  })
  .then((recipeOne) => {
    console.log(recipeOne.title)
    //Iteration 3
    return Recipe.insertMany(data);
  })
  .then (() => {
    return Recipe.find({},{
      title: 1
    })
  })
  .then ((result) => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
