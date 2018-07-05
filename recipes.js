const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const port = 3000;
const hbs = require("hbs");
const express = require("express");
const path = require("path");

const data = require('./data.js');
const app = express();


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  app.use(express.static(path.join(__dirname + "public")));
  app.set("view engine","hbs");
  app.set("views",__dirname + "/views");

  const recipesRoutes = require("./routes/recipes")
  app.use("/recipes", recipesRoutes);

  app.listen(port, ()=>{
    console.log("Corriendoe en el 3000")
})
