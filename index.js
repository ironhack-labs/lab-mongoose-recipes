require('dotenv').config();
const mongoose = require('mongoose');



// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = process.env.MONGODB_URI

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })


  .then(() => {
  Recipe.create({
    title:'jollofRice',
    cuisine: 'african',
    ingredients: 'rice,tomatoes,maggi,salt,pepper',
    dishType: 'main_course',  
   })
  .then(createdRecipe => console.log(createdRecipe))

    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  
  // Iteration 3- insert multiple recipes.  
  
  Recipe.insertMany(data)
  .then(insertedData => console.log(insertedData))
  
  //Iteration 4- update duration field for Rigatoni alla Genovese
  
  // Recipe.findOneAndUpdate({duration:'220'}, {duration:'100'}, {new: true})
  // .then(updatedRecipe => console.log(updatedRecipe))
  // .catch(err => console.log(err))

// Iteration 5- remove receipe carrot cake.

  // Recipe.deleteOne({title: 'Carrot Cake'})
  // .then(deletedRecipe => console.log(deletedRecipe))
  
  