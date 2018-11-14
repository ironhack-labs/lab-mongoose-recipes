const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');



  const recipeSchema = new Schema({
    title : {type: String, required: true, unique: true},
    level: {type:String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients : {type:Array},
    cuisine: {type:String, required: true},
    dishType: {type:String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type:String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type:Number, min: 0},
    creator: String,
    created:{type:Date, default: Date.now},
  });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports = Recipe;


  mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    Recipe.create({ title: 'Tallarines', cuisine: "china"}, function (err, user) {
    if (err) {
        console.log('An error happened:', err);
    } else {
        console.log('The user is saved and its value is: ', user);
    }
  });
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  
