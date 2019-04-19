const express=require('express');
const mongoose = require('mongoose');
const path=require
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const app=express()


app.set('view engine','hbs')
app.set('views',__dirname +'/views')
app.use(express.static(path.join(__dirname,'public')))
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
app.get('/-',(req,res)=>{
  const chilaquiles= 
})

  app.listen(8000,()=>{
    console.log('estoy vivo, solo por hoy')
  })

