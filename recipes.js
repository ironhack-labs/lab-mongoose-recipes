const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipesApp');

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['Easy Peasy',  'Amateur Chef', 'UltraPro Chef'] },
  ingredients:{type:[]},
  cuisine:{type:String},
  images: { type: String, default: 'images/default-avatar.png' },
  dishType: { type: String, enum: ['Breakfast', 'Dish',  'Snack' , 'Drink' , 'Dessert', 'Other'] },
  duration: { type: Number, min: 0,},
  creator:{type:String},
  created: { 
    type: Date,
    default: Date.now
  }
});

const Recipe=mongoose.model('recipe',recipeSchema)
module.exports = Recipe;

Recipe.create({
  title: 'lentejas',
  level: 'UltraPro Chef',
  ingredients:['lentejas','mortadela'],
  cuisine:'italiana',
  images: null,
  dishType:'Breakfast',
  duration:30,
  creator:'Marcco',
  created:null,
  })
  .then(recipe => { console.log(recipe.title) })
  .catch(err => { console.log('An error happened:', err) });



  Recipe.insertMany(data)
  .then(recipe => { console.log(recipe.title) })
  .catch(err => { console.log('An error happened:', err) });;









    


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
