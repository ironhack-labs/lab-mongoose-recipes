const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema({
    title:String,
    level:{type:String, enum:["Easy Peasy",'Amateur Chef', 'UltraPro Chef']},
    ingredients:Array,
    cousine:String,
    dishType:{type:String, enum:['Breakfast', 'Dish','Snack', 'Dessert', 'Other']},
    image:{
      type:String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration:{
      type:Number,
      min:0
    },
    creator:String,
    created:{
      type:Date,
      default:'Today'
    }
  })



const Recipe = mongoose.model('recipes', recipeSchema)


Recipe.create(data).then((recipe)=>console.log(recipe)).catch()




app.listen(3000)