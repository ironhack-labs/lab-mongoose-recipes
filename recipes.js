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
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: {type: Array},
    cuisine: {type: String, required: true},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default: Date.now}
  })

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

Recipe.create({ title: 'Spaghetti Bolognese', level: 'Easy Peasy', ingredients: ['Pasta', 'Tomato', 'Minced Meat', 'Olive Oil', 'Basil', 'Pepper', 'Salt', 'Parmegiano'], cuisine: 'Italian', dishType: 'Dish', image: 'https://images.media-allrecipes.com/images/75131.jpg', duration: 30, creator: 'Felix'})
  .then(recipe => {console.log('The recipe is saved and its value is: ', recipe.title) })
  
  Recipe.insertMany(data)
  .then(data => {
    for (i = 0; i < data.length; i++) {
      console.log('The recipe is saved and its value is: ', data[i].title)   
    }
  })
  .then(() => Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, {duration: 100}))
  .then(recipe => {
    console.log('Value updated.')
    }
  )
  .then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
  .then(recipe => {
      console.log('Entry deleted.')
      }
    )
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.log('An error happened updating duration:', err)
    }
  )