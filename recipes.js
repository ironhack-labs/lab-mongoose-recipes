const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const Recipe = mongoose.Schema 

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema= new Schema ({
  title: {
    type: String,
    required: true,
    unique: true},
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef', ] },
  ingredients: {
    type: Array},
  cuisine: {
    type: String,
    required: true},
  dishType: {
    type: String,
    enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {
    type: String, 
    default: `https://images.media-allrecipes.com/images/75131.jpg.`},
  duration: {
    type: Number,
    min: 0},
  creator: {
    type: String},
  created: {
    type: Date,
    default: Date.now}

});

Recipe.Create({
  title: 'Breakfast Burrito',
  level: 'UltraPro Chef',
  cuisine: 'BrexMex'
})

  Recipe.then (recipeDoc => {
    console.log("RECIPE CREATE WORKED!! :)", recipeDoc);
})
  Recipe.catch (err => {
    console.log("RECIPE CREATE failed :(", err)
});

Recipe.insertMany({ 

})

  Recipe.then(recipeDoc => {
    console.log("IMPORT OF RECIPES WORKED!! :)", recipeDoc);

  Recipe.catch (err => {
      console.log("IMPORT OF RECIPES failed :(", err)
  
  });
})
