const data = require('./data.js');
const mongoose = require('mongoose');
const Recipes = require("./models/recipesSchema.js")
var db = `recipeApp`
var host = `mongodb://localhost/${db}`

mongoose.connect(host)
    .then(() => {
    console.log('Connected to Mongo!');
    App.singleImport()
    App.manyImport()
    App.updateRecipe()
    App.removeRecipe("Carrot Cake")
    mongoose.disconnect(host)
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const App = {
  init: () => {

  },
  singleImport: () => {
    Recipes.create({ title: 'Patatas fritas con huevo', level:"Easy Peasy", cuisine: 'Old School', dishType: "Dish", duration: 10, creator: "Alfonso" })
      .then(recipe => console.log(`The recipe was saved and their title is: ${recipe.title}`))
      .catch(err => console.log('An error happened:', err)); 
  },
  manyImport: () => {
    Recipes.insertMany(data)
    .then(recipe => getTittle(recipe))
    .catch(err => console.log("An error happened: ", err))
  },
  updateRecipe: () => {
    Recipes.updateOne({title: "Rigatoni alla Genovese"}, { duration: 100})
  .then(() => console.log("You updated: "))
  .catch(err => console.log("An error happened: ", err));
  },
  removeRecipe: (recipeTitle) => {
    Recipes.deleteOne({title: recipeTitle})
    .then(() => console.log("Remove sucessful"))
    .catch(err => console.log("An error happpened: ", err))
  },

}

function getTittle(arr) {
  arr.forEach((arr) => {
    console.log("The recipe was saved and their title is: " + arr.title)
  })
}