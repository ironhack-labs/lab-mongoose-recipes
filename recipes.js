const express  = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeRoutes = require('./routes/recipes.js')
  app.use('/',recipeRoutes)

  app.listen(3000,()=>{console.log('App running on port 3000')})
