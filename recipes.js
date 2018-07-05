const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const port = 3000;
require('hbs');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//rutas
app.get('/', (req,res)=>{
  res.render('home')
});

const recipeRoutes = require('./routes/recipe');
app.use('/recipe', recipeRoutes)

  app.listen(port, ()=>{
    console.log('corriendo en el 3000')
});