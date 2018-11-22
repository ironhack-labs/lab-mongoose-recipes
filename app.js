const mongoose = require('mongoose');
const express = require("express");

const app = express()



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recipesRoute = require("./routes/routes")
app.use("/", recipesRoute)



  app.listen(3000, ()=>{
    console.log("Es 3000")
  })