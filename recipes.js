const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const express = require('express')
const hbs = require('hbs')


//app
const app = express()

//static files
app.use(express.static('public'))
//hbs
app.set('views',__dirname + '/views')
app.set('view engine','hbs')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  //routes
const newrecipes = require('./routes/newrecipes')
app.use('/',newrecipes)

app.listen(3000,()=>{
  console.log('App running on port 3000, now with Mongoose!!')
})