/* eslint-disable prefer-destructuring */
/* eslint-disable new-cap */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title : {
    type : String, unique : true, required : true, dropDups : true,
  },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients : { type : Array },
  cuisine : { type : String, required : true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image : { type : String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration : { type : Number, min: 0 },
  creator : { type : String },
  created : { type : Date, default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000) },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
Recipe.collection.drop();
Recipe.insertMany(data, (err, recipe) => {
  if (err) {
    console.log('An error happened:', err);
  } else {
    console.log('The user is saved and its value is: ', recipe);
  }
});

Recipe.updateOne({ title : 'Rigatoni alla Genovese' }, { duration : 100 },  (err) => {
  if (err) {
    console.log('An error happened:', err);
  } else {
    console.log('Updated');
  }
});

Recipe.deleteOne({ title:'Carrot Cake' },   (err) => {
  if (err) {
    console.log('An error happened:', err);
  } else {
    console.log('Deleted');
  }
});
