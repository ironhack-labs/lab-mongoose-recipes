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
  title : {type:String, required : true, unique : true},
  level: {type: String, enum : ["Easy Peasy","Amateur Chef","UltraPro Chef"]},
  ingredients  : [String],
  cuisine : {type:String, required : true},
  dishType : {type : String, enum : ["Breakfast","Dish","Snack", "Drink", "Dessert", "Other"]},
  image : {type : String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration : {type : String, min:0},
  creator : {type : String},
  created : {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({ title: 'test', cuisine :"test"})
  .then(user => { console.log('The user is saved and its value is: ', user) })
  .catch(err => { console.log('An error happened:', err) });

Recipe.insertMany(data)
.then(user => { console.log('The user is saved and its value is: ', user) })
.catch(err => { console.log('An error happened:', err) });
