const express = require('express');
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo: ', err)
  });

const app = express();

const recipeRoutes = require('./routes/recipe');
app.use('/', recipeRoutes);

app.listen(port, ()=>{
  console.log('corriendo en el ' + port);
});

