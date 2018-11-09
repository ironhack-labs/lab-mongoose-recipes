const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.insertMany(data, function(error, docs) {
  // console.log("it worked?", docs);
  console.log("not working", err);
docs.forEach(pussy => {
  console.log(`print out pussy ${pussy.title}`);
});


///recipe? 
// const helensRecipe = new Recipe ({
//   name: Grits,
//   type: String, 
//   required: true,

})
const recipeSchema = new mongoose.Schema ({

title: { 
  type: String
},

level: {
  type: String,
  enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  required: true,
},

ingredients: {
  type: Array,
},

cuisine: { 
  type: String,
  required: true,
},

dishType: {
  type: String,
  enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  required: true,
},

image: {
  type: String, 

},

duration: {
  type: Number,
  min: 0,
},

creator: {
  type: String,
},

created: {
  type: Date,
  default: Date.now,
},

});