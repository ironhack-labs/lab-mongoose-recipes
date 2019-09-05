const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const RecipeData = require('../data.js');

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now },
})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe

// Recipe.create({
//   title: 'Ropa Vieja',
//   level: 'UltraPro Chef',
//   ingredients: ['Beef', 'Peppers', 'Beans'],
//   cuisine: 'Cuban',
//   dishType: 'Dish',
//   duration: 60,
//   creator: 'Uschi Otze',
//   created: '2017-05-13'
// })
//   .then(recipe => { console.log('Successfully inserted ', recipe.title) })
//   .catch(err => { console.log('Error: ', err) })

// Recipe.insertMany(RecipeData)
//   .then(recipe => { console.log('Successfully inserted ', recipe.title) })
//   .catch(err => { console.log('Error: ', err) })

// Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
//   .then(recipe => { console.log('Successfully updated ', recipe) })
//   .catch(err => { console.log('Error: ', err) });

// Recipe.deleteOne({ title: 'Carrot Cake' })
//   .then(recipe => { console.log('Successfully deleted ', recipe.title) })
//   .catch(err => { console.log('Error: ', err) });
