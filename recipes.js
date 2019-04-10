const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeModel = new Schema({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
    ingredients: {type: Array},
    cuisine: {type: String, required: true},
    dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default: new Date()}
  });
  
  const Recipe = mongoose.model("recipe", recipeModel);

  Recipe.create(data[0])
  .then(newRecipe => { console.log('The user is saved and its value is: ', newRecipe) })
  .catch(err => { console.log('An error happened:', err) });