const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://heliodcf:OLevita21@cluster0.vsv4xuz.mongodb.net/recipe-app?retryWrites=true&w=majority';

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
    //Interation 2
   //Recipe.create(data[0])
    //.then((recipe) => console.log("The recipe save is: ", recipe.title))
    //.catch((error) => console.log("error: ", error))
  
   //Interation 3
   Recipe.create(data)
   .then((data) => data.forEach(recipe => console.log(recipe.title)))
  
  })




  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
