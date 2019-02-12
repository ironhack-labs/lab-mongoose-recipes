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
  title: {type: String},
  level: {type: String},
  ingredients: {type: Array},
  cuisine: {type: String},
  dishType: {type: String},
  image: {type: String},
  duration: {type: Number},
  creator: {type: String},
  date: {type: Date, default: Date.now}
});

const Recipe  = mongoose.model('Recipe', recipeSchema);


Recipe.create({
title: "French Onion",
 level: "Beginner",
 ingredients: ['onions', 'soup'],
 cuisine: 'French',
 dishType: 'Soup',
 images: 'url(images/image)',
 duration: 15,
creator: "Gordon Childs",
// created: ''
          })
