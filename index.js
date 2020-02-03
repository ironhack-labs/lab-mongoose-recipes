const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
function createRecipe(title, level, ingredients, cuisine, dishType, image, duration, creator, created) {
  Recipe.create({
    title,
    level,
    ingredients,
    cuisine,
    dishType,
    image,
    duration,
    creator,
    created
  }).then(res => {
    console.log(title);
    mongoose.disconnect();
  }).catch(err => console.log(err));
}


createRecipe("pizza", "Amateur Chef", ["tomato", "eggs", "flour", "salt", "water", "ham", "mushroom"], "Italian", "Dish", "30", "Chef Mario")
.then(x => console.log(x))
.catch(Err => console.log(Err));


//
function updateRecipe(id, duration) {
  
  Recipe.findByIdAndUpdate("The Rigatoni alla Genovese", { duration: "100" })
    .then(res => {
      console.log("user updated", res);
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err);
    });
}

//
function deleteRecipe(title) {
  Recipe.findByIdAndRemove("The Carrot Cake")
    .then(res => {
      console.log("Recipe deleted", res);
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err);
    });
}


mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));




module.exports = {
  createRecipe, // C
  readRecipe, // R
  updateRecipe, // U
  deleteRecipe // D
};