const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

let express = require('express');
let hbs = require('hbs');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Malen')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
  // import express

//ejecutamos express

let app = express()

//config
//config de estaticos
app.use(express.static('public'))

//config  del sistema de los templates
app.set("view engine", "hbs")//que motor
app.set("views", "./views")//donde esta tu html
//config partials
hbs.registerPartials(__dirname + '/views/partials');
//config de la base de datos

mongoose.connect("mongodb://localhost:27017/Malen",()=>console.log("conectamos!!"))


//importacion de rutas
let index = require("./routes/index")
let books = require("./routes/books")
app.use("/books", books)
app.use("/", index)


//encender el servidor
app.listen(3000,()=>console.log('corriendo'))