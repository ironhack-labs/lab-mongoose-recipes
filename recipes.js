const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other' ] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

Recipe.create({ title: 'Felix Cookies', level: 'UltraPro Chef', ingredients: ['butter', 'flour', 'sex appeal', 'pixie dust', 'dog sweat'], cuisine: 'Exotic', dishType: 'Other', image: 'http://66.media.tumblr.com/d1c0478c7b3de0c31c9feab6b70e7d12/tumblr_mit1q3gW751r3w8m7o1_400.png', duration: 69, creator: 'God'})
.then(recipe => {
  console.log(recipe.title)
});

Recipe.insertMany(data)
// .then(recipe => {
//   for (var i = 0; i < data.length; i++) {
//     console.log(recipe.title);
//   }
// });

Recipe.updateOne({ title: "Rigatoni alla Genovese"}, {duration: 100})
.then(recipe => {
  console.log("Updated successfully!")
});

Recipe.deleteOne({ title: "Carrot Cake"})
.then(recipe => {
  console.log("Deleted successfully!")
});


mongoose.connection.close(function() {
  console.log("yea, it's closed. Sick")
})
