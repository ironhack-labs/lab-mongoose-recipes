
const express = require("express")
const hbs = require("hbs")
const mongoose = require('mongoose');
const path = require("path")
const port = 3000
const Schema   = mongoose.Schema;


const app = express()

app.set("view engine","hbs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))

mongoose.connect('mongodb://localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipesRoutes = require("./routes/recipesRoutes")
app.use("/",recipesRoutes)

app.listen(port, ()=>console.log("Funcionando en el puerto 3000"))