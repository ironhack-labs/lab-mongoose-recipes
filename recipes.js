const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema ({
  title: { type: String, required: true, unique: true }, // It should be required and unique.
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'Ultrapro Chef'] }, // Only values: Easy Peasy - Amateur Chef - UltraPro Chef
  ingredients: [],
  cuisine: { type: String, required: true }, // Should be required
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] }, // Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' }, // Default value: https://images.media-allrecipes.com/images/75131.jpg.
  duration: { type: Number, min: 0 }, // Min value should be 0.
  creator: String,
  created: { type: Date, default: Date.now }, // By default today.
});