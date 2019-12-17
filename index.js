const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

Recipe.create({
  title: "Cherios with milk",
  level: "Easy Peasy",
  ingredients: ["milk" , "cherios"],
  cuisine: "Mix milk with cherios",
  dishType: "Breakfast",
  duration: 10,
  creator: "Analin Flores"

})
.then (recipe =>{ console.log(`New recipe created ${recipe.title}`)})
.catch(err => {console.log(`An error happend ${err}`)})
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

