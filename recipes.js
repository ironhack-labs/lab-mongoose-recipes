const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

// APP.JS
mongoose.connect('mongodb://localhost/database-name', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

//MODELS/RECIPE
const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const Recipe = mongoose.model('Recipe', recipeSchema);

//ROUTES

Recipe.create({
  title: 'Arroz con leche', 
  level: 'Easy', 
  ingredients: ['Rice', 'Milk', 'Cinamon', 'Sugar', 'Lemon'],
  cousine: 'Spanish',
  dishType: 'Dessert',
  duration: 60,
  creator: 'MasterAnnaCheff',
})
.then((recipe) => {
  console.log(recipe.title);
  return Recipe.insertMany(data)
})
.then(data => {
  console.log('Inserted');
  return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
})
.then(recipe => {
  console.log('updated');
  return Recipe.deleteOne({title: 'Carrot Cake'})
})
.then(recipe => {
  console.log('deleted');
})
.then(result => mongoose.disconnect())
.catch((err) => {
  console.log(err);
})
