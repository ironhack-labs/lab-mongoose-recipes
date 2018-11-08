/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose
  .connect('mongodb://root:root@localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
  title: { type: String, unique: true },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

// Iteration 2 - Create a recipe
Recipe.create({
  title: 'Macaroni',
  level: 'Easy Peasy',
  ingredients: ['Macaroni', 'Sauce', 'Salt', 'Ketchup', 'Minced Meat'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image:
    'https://i0.wp.com/www.bharatzkitchen.com/wp-content/uploads/2018/02/MACRONI-2.jpg',
  duration: '30',
  creator: 'Romulo Franca'
})
  .then((results) => {
    console.log('The title is saved and its value is: ', results.title);
  })
  .catch((err) => {
    console.log('An error happened:', err);
  });

// Iteration 3 - Insert Many recipes
Recipe.insertMany(data)
  .then((results) => {
    console.log('The title is saved and its value is: ', results);
  })
  .catch((err) => {
    console.log('An error happened:', err);
  });

// Iteration 4 - Update recipe
Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((results) => {
    console.log('Success update ', results);
  })
  .catch((err) => {
    console.log('An error happened:', err);
  });

// Iteration 5 - Remove a recipe
Recipe.deleteOne({ title: 'Carrot Cake' })
  .then((results) => {
    console.log('Success delete entry ', results);
  })
  .catch((err) => {
    console.log('An error happened:', err);
  });

//  Iteration 6 - Close the Database
mongoose.connection.close();
