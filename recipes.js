const data = require('./data.js');
const mongoose = require('mongoose');
const Recipes = require("./models/recipesSchema.js")
var db = `recipeApp`
var host = `mongodb://localhost/${db}`

mongoose.connect(host)
    .then(() => {
      App.import()
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const App = {
  init: () => {

  },
  import: () => {
    Recipes.create({ title: 'Patatas fritas con huevo', level:"Easy Peasy", cuisine: 'Old School', dishType: "Dish", duration: 10, creator: "Alfonso" })
      .then(title => { console.log('The recipe was saved in their title is: ', title) })
      .catch(err => { console.log('An error happened:', err) }); 
  }
}

