const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')
require('hbs');


const recipe = express();
recipe.use(express.static(path.join(__dirname,'public')));
recipe.set('view engine', 'hbs');
recipe.set('views', __dirname + '/views');

const recipeRoutes = require('./routes/recipe');
recipe.use('/recipe', recipeRoutes);

mongoose.connect('mongodb://localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
});

recipe.get('/', (req,res)=>{
  res.render('lista')
});

recipe.listen(3000, ()=>{
    console.log('corriendo en el 3000')
});


