const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema({
    title : {String, required: true, unique: true},
    level: {String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients : {Array},
    cuisine: {String, required: true},
    dishType: {String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {Number, min: 0},
    creator: {String},
    created:{Date, default: Date.now},
  });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports = Recipe;
