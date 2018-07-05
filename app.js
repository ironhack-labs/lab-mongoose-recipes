const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = 3000;
require('hbs');

mongoose.connect('mongodb://localhost:27017/recipeApp', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');

  //routes
  app.get('/', (req, res) => {
    res.render('home');
  });

  const recipeRoute = require('./routes/recipe');
  app.use('/recipe', recipeRoute);


  const Schema   = mongoose.Schema;
  const data = require('./data.js')


  app.listen(port, ()=>{
    console.log('server 3000');
  });





