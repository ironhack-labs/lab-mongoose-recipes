const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


const Recipe = new Schema({
  title : { type: String, unique: true },
  level: { type: String, enum: ["Easy Peasy","Amateur Chef","UltraPro Chef"]},
  ingredients : Array,
  cousine:{ type: String, required: true },
  dishType:{ type: String, enum: ["Breaksfast","Dish","Snack","Drink","Dessert","Other"]},
  image:{ type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration:{ type: Number, min: 0},
  creator:String,
  created:{ type: Date, default: Date.now },
});

// const Cat = mongoose.model('Cat', catSchema);