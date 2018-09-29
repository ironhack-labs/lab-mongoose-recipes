const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const RecipeSchema = require('./models/RecipeSchema');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

//SEGUNDA ITERACION
const recipeTitle = new RecipeSchema({
  title: "Huevos con chorizo",
  cousine: "Mexicana"
})

function createNewRecipe() {
  recipeTitle.save()
    .then(res => {
      console.log(res.title)
    })
    .catch(err => {
      console.log(err)
    })
}
//createNewRecipe();


//CREATE - TERCERA ITERACION
function create(data) {
  RecipeSchema.insertMany(data)
    .then(res => {
      console.log(res.title)
    })
    .catch(error => {
      console.log(error)
    })
}
// create(data)