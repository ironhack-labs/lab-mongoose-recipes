const mongoose = require('mongoose');
const express = require("express");
const Schema   = mongoose.Schema;

const Recipe = require('./recipe-model.js');
const data = require('./data.js');

const app = express();

// const patesCarbo = new Recipe ({ title: "pates carbo" , cousine: "italienne", duration: 50});
// patesCarbo.save()
// .then ((recipeDoc) => {
//   console.log("Recipe create success", recipeDoc)
// })
// .catch ((err) => {
//   console.log("Recipe create FAILED 💩💩", err);
// });


Recipe.insertMany(data).then ((allRecipes) => {
  console.log("youhou", allRecipes[0].title)
})
.catch ((err) =>{
  console.log("sale looser, ça n'a pas fonctionné", err)
})


mongoose.connect('mongodb://localhost/lab-mongoose-recipes')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


app.listen(3000, () =>{
  console.log("you go girls!");
})
