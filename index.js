const express = require('express');
const app = express();
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

function addRecipes(data) {

  Recipe.create(data)
    .then((recipe) => {
      console.log('recipe')
    })
    .catch(err => { console.log(err) });
}

function update(tittle, field, newValue) {
  Recipe.findOneAndUpdate({ title: `S{tittle}` }, { field: newValue })
    .then((update) => {
      console.log('Update Feito');
    })
    .catch(erro => { console.log(erro) });
}

function deleteRecipe(title) {
  Recipe.deleteOne({ title: `${tittle}` })
    .then((delet) => {
      console.log('Deletado');
    })
    .catch(erro => { console.log(erro) });
}

function closeConect(){
  mongoose.connection.close();
  console.log('Fechado');
}

setTimeout(closeConect, 1500)

// app.listen(3000);
