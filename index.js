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

function run() {
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
  Recipe.insertMany( data)
    .then( data => { console.log("Number of new recipes added: ", data.length)} )
    .catch( err => { console.log("Error: ", err)} )

  3
  // Update recipe
  Recipe.updateOne( { title: "Rigatoni alla Genovese" }, { duration: 100})
    .then( recipe => { console.log("Recipe has been updated: ", recipe.title)} )
    // ^^^ why does this line give undefined?
    .catch( err => { console.log("Error: ", err)} )


  // Delete recipe
  Recipe.deleteOne( { title: "Carrot Cake" } )
    .then( val => { console.log("Recipe has been removed.")} )
    .catch( err => { console.log("Error: ", err)} )
}

var disconnect = new Promise( (resolve, reject) => {
  run()
  if (Recipe.count({})){
    resolve(1)
  }
})


disconnect.then(() => {
    console.log('Disconnected from Mongo');
  })
  .catch((err) => {
    console.error('Error during exec', err);
  })