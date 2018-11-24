const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  //1. Create a schema for the recipes 
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true},
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: { type: Number, min: 0},
  creator: { type: String},
  created: { type: Date, default: Date.now}
})
 // 2. Create a recipe object que je peux crud
 const Recipe = mongoose.model('Recipe', recipeSchema);
 module.exports = Recipe;

 // 3. Create a recipe 
 Recipe.create({ title: 'Risotto', level: 'Easy Peasy', ingredients: ['riz', 'wine', 'mushrooms'], cuisine: 'italian', dishType: 'Dish', duration: '30', creator: 'Sandra et Rita'})
  .then(() => console.log('success'))
  .catch(() => console.log('error'));
  
 
// 3. INSERT MANY RECIPES
Recipe.insertMany(data)
  .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: '100'}))
  .catch(()=> console.log('Error')); 

