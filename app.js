const express = require('express');
const hbs = require('hbs');
const app = express();
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const recipes = require('./routes/recipes')

app.set('view engine','hbs')
app.set('views',__dirname +'/views')

app.use(express.static('public'))
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
app.use('/',recipes)
process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  });

app.listen(3000,()=>{
    console.log("conexion realizada en el puerto localhost:3000")
})