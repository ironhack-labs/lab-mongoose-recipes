const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//Need to call all functions within the mongoose connect, might catch error multiple times
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

//Iteration 1, Create a Schema
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients:  Array,
  cousine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0},
  creator: String,
  created: Date, 
});

// Iteration 2, Create function for making recipe
let myRecipe = new Recipe({ 
  title: 'Chickpea No-Tuna Sandwich', 
  level: 'Amateur Chef',
  ingredients: ['1 can chickpeas', '3 tablespoons tahini', '2 tablespoons dijon mustard', '1 tablespoon maple syrup', '1/4 cup red onions, diced', '1/4 celery, diced', '1/4 cup pickles, diced', '1 tablespoon capers'],
  cousine: 'Sandwich',
  dishType: ['Dish'],
  image: 'https://www.saltandlavender.com/wp-content/uploads/2018/01/chickpea-salad-sandwich-2-680x1020.jpg',
  duration: 10,
  creator: 'Vegan AF' })
  .then((recipe) => { console.log(title) })
  .catch((err) => { console.log('An error happened:', err) });

myRecipe.save() // Create a new user and return a promise
  .then(user => { console.log('The recipe was created') })
  .catch(err => { console.log('An error occured', err) });

//Iteration 3, Make function to grab data and add to db
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
