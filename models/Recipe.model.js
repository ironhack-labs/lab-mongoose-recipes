const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
title: { // Type String. It should be required and unique.
  type: String,
  required: true,
  unique: true,
}, 
level: { // Type String. Can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the enum validator 😉).
  type:String,
  enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
}, 
ingredients: [ String ], // Type Array of Strings (represented as [ String ]).
cuisine: { // Type String. Should be required.
  type: String,
  required: true,
}, 
dishType: { //Type String. Possible values: breakfast, main_course, soup, snack, drink, dessert or other.
  type:String,
  enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'],
},  
image: { // Type String. Default value: "https://images.media-allrecipes.com/images/75131.jpg".
  type: String,
  default: 'https://images.media-allrecipes.com/images/75131.jpg',
},  
duration:{  // Type Number. The minimum value should be 0.
  type:Number,
  min:0,
},
creator: String,// Type String.
created: { //Type Date. By default, today. 
  type: Date,
  default: Date.now,   // `Date.now()` returns the current unix timestamp as a number
},
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
