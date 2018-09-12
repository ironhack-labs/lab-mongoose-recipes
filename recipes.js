'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')


const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: Array,
  },
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfas', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  iamge: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    minimum: 0
  },
  creator: {
    type: String,
  },
  created: {
    type: Date
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  Recipe.create({
    title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: Array,
  },
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfas', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  iamge: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    minimum: 0
  },
  creator: {
    type: String,
  },
  created: {
    type: Date
  }
  })
 
  Recipe.insertMany(data,(err, recipes) => {
    if (err){
      console.log('ERROR');
    }
    for (let i = 0; i < recipes.length; i++) console.log(recipes[i].title);
  })

Recipe.update({title:'Rigatoni alla Genovese' },{ $set: {duration: 100}});

Recipe.remove()
.then(console.log('Success!'))

  module.exports = Recipe;
