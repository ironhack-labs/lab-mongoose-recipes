const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const createRecipe = Recipe.create(data[0])
  .then(recipe => console.log(`Receita: ${recipe.title}`))
  .catch();

const insertRecipe = Recipe.insertMany(data)
  .then(recipe => {recipe.forEach(eachRecipe => console.log(`Receita: ${eachRecipe.title}`))})
  .catch()

const updateRecipe = Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(recipe => { console.log(`Recipe updated`)})
  .catch()

const deleteRecipe = Recipe.deleteOne({title: 'Carrot Cake'})
  .then(recipe => {console.log('Recipe removed')})
  .catch();

Promise.all([createRecipe, insertRecipe, updateRecipe, deleteRecipe])
  .then(res =>{
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
      });
  })
  .catch();
  