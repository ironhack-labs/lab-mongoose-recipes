const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe 
const data = require('./data.js');  // Import of the data from './data.js'


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Create a new recipe
const firstRecipe = Recipe.create(
  {  
    title: 'Alex Recipe',
    level: 'Amateur Chef',
    ingredients: ['chicken'],
    cuisine: 'Asian',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 20,
    creator: 'alex'
  })
  .then( recipe => { console.log("My new recipe is called: ", recipe.title)} )
  .catch( err => { console.log("Error: ", err)} )


// Import data from file to create recipes
// **** MISSING: NOT SURE HOW TO PRINT ON EACH ITERATION *****
const insertMany = Recipe.insertMany( data)
  .then( data => { console.log("Number of new recipes added: ", data.length)} )
  .catch( err => { console.log("Error: ", err)} )


// Update recipe
const updateOne = Recipe.updateOne( { title: "Rigatoni alla Genovese" }, { duration: 100})
  .then( val => { console.log("Recipe has been updated: ", val.title)} )
  // ^^^ why does this line give undefined?
  .catch( err => { console.log("Error: ", err)} )

// Delete recipe
const deleteOne = Recipe.deleteOne( { title: "Carrot Cake" } )
  .then( val => { console.log("Recipe has been removed.")} )
  .catch( err => { console.log("Error: ", err)} )

Promise.all([firstRecipe, insertMany, updateOne, deleteOne])
  .then( result => { 
    console.log("all ops have finished");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));