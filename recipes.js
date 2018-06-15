// import { callbackify } from 'util';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({title: 'Pasta', level: 'Amateur Chef', ingredients: ['yeets', 'chreasts', 'sheets'], cousine: 'We da best'});

Recipe.insertMany(data)
  .then((recipe) => {console.log('The recipe is ', recipe)})
  .catch((err) => {console.log('An error has wrecked you: ', err)});

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then((recipe) => {console.log('Successfully updated Rigatoni!')})
  .catch((err) => {console.log(err)});

Recipe.remove({title: 'Carrot Cake'})
  .then((recipe) => {console.log('Successfully deleted Carrot Cake')})
  .catch((err) => {console.log(err)});
  

setTimeout(() => mongoose.disconnect(), 3000)