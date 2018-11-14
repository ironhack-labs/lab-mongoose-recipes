const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const recepieSchema = new Schema({
    title:  { type: String},
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']}, 
    ingrediets: [],
    cuisine: [],
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert','Other'] },
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: { type: Number },
    creator: { type: String },
    created: { type: Date, default: Date.now },
  });