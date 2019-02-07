let express = require ('express')
let hbs = require ('hbs')
const mongoose = require('mongoose');
let app = express()
let Schema   = mongoose.Schema;
// const data = require('./data');


mongoose.connect("mongodb://localhost:27017/recipeApp", ()=>console.log ("Conectado amigo"))
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
// let index = require ('./routes/index')
let recipes = require('./routes/recipes')


app.use("/recipes", recipes)
// app.use("/", index)


app.listen (3000, () => console.log("Corriendo!!"))