const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const express = require('express')

//app
const app = express()

//hbs
app.set('views', __dirname + '/views')
app.set('view engine','hbs')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

//routes
const recipesRoutes = require('./routes/recipes')
app.use('/', recipesRoutes)

//app init
app.listen(3000,()=>{
   console.log('App running on port 3000')
 })