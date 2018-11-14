const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  mongoose.model('Recipe',{
    title: {type: string, unique: true},
    level: {type: string, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
    ingredients: {type: array},
    cuisine: {type: string, required: true},
    dishType: {type: string, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
    image: { type: string, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: { type: number, min: 0},
    creator: {type: string},
    date: {type: date, default: date.now}
  })