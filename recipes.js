const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')
const Recipe = require("./models/Recipe");

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });



  Recipe.create({
    title: "Torrijas",
    level: 'Easy Peasy',
    ingredients: ["Pan", "Leche", "Azucar", "Canela", "Aceite", "Harina", "Limon"],
    cousine: "Española",
    dishType: 'Dessert',
    image: "http://elpetitchef.com/Images/134/presentacion.jpg",
    duration: 90,
    creator: "Raul",
  
    })
