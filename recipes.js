const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: Array,
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: ' https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;

// Recipe.create({
//   title: 'Asian Glazed Chicken Thighs',
//   level: 'Amateur Chef',
//   ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
//   cuisine: 'Asian',
//   dishType: ['Dish'],
//   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//   duration: 40,
//   creator: 'Chef LePapu'
// })



Recipe.insertMany(require('./data.js'))

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => {
    console.log('Success!!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Recipe.deleteOne({ title: 'Carrot Cake' })
//   .then(() => {
//     console.log('Deleted!!');
//   }).catch(err => {
//     console.error('Error connecting to mongo', err);
//   });

Recipe.find({}, (err, recipe) => {
  // recipes is an array of Cat instances
  recipe.forEach((recipe) => {
    console.log(' --> title: ', recipe.title);
  });
})
// mongoose.disconnect()






