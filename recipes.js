const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const data = require('./data.js');
const express = require('express')
const hbs = require('hbs')
let app = express()

mongoose.connect('mongodb://localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let recipes = require('./routes/recipes')
app.use('/', recipes)

app.use(express.static("public"))
app.set("view engine", "hbs")
app.set("views", "./views")

app.listen(3000, () => console.log("It works!"))