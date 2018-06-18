const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const Schema = mongoose.Schema;

// creating a Schema for Recipe type
const recipeSchema = new Schema({

  title: { type: String },
  level: { type: String },
  ingredients: { type: Array },
  cousine: { type: String },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now() }
});

// creating an actual realization of the cat Schema
// you can also create a new Dog model with a specified dogSchema (which I have to specify before)
const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
// Same code but with a Promise version

Recipe.create({ 
  title: 'Frenchsoup',
  level: 'Amateur Chef',
  ingredients: 'Onions',
  cousine:'French',
  dishType:'Dish',
  image: 'https://glorioussouprecipes.com/wp-content/uploads/2014/01/French-Onion-Tomato-Soup-Recipe.jpg',
  duration: 30
})
  .then((recipe) => { console.log('The recipe is saved. ') })
  .catch((err) => { console.log('An error happened:', err) });

 console.log(data);



Recipe.insertMany(data)
  .then((data) => { console.log('The recipes are saved') })
  .catch((err) => { console.log('An error happened:', err) });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((recipe) => { console.log('The recipe is updated') })
  .catch((err) => { console.log('An error happened:', err) });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((recipe) => { console.log('The recipe is deleted') })
  .catch((err) => { console.log('An error happened:', err) });


 //mongoose.connection.close();