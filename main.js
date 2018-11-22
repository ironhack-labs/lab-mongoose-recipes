const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const express = require('express')
const hbs = require('hbs')

const app = express();

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

  const newrecipes = require('./routes/newrecipes')
  app.use('/',newrecipes)
  app.get('/close',(req,res)=>{
  console.log('bye, me cierro')
  mongoose.connection.close()
})

  app.listen(3000,()=>{
    console.log('shits working')
  })
