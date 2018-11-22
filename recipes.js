const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipesRoutes = require('./routes/recipe')

app.use('/', recipesRoutes)

app.get('/close', (req,res)=>{
  console.log('cierrate sesamo')
  mongoose.connection.close()
 })

app.listen(3001, () =>{
      console.log('server live')
})