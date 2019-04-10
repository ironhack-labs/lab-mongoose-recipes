const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const recipeSchema = new Schema({
  title : String,
  level: String,
  ingredients  : String,
  cuisine : String,
  dishType : String,
  image : String,
  duration : Number,
  creator : String,
  created : Date
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

/*
title. Type String. It should be required and unique.
level. Type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉)
ingredients. Type Array.
cuisine. Type String. Should be required.
dishType. Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
image. Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
duration. Type Number. Min value should be 0.
creator. Type String
created. Type Date. By default today.*/