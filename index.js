const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// Recipe.create({
//   title: 'Chocolat Mousse',
//   level: 'Easy peasy',
//   ingredients: ['200g dark chocolate', '10g butter', '8 eggs'],
//   cuisine: 'french',
//   dishType: 'Dessert',
//   image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/basicchocolatemousse_93648_16x9.jpg',
//   duration: 20,
//   creator: 'Paul Bocuse'
// }, function (err, Recipe) {
//   if (err) {
//       console.log('An error happened:', err);
//   } else {
//       console.log('The recipe is created: ', Recipe.title);
//   }
// });

// Recipe.insertMany(data, data.forEach(element => console.log(element.title)));

Recipe.findByIdAndUpdate("5dc2f2fb6f76eb4922de83c8", {duration: 100})
  .then("The value is successfully changed")
  .catch("error");

  Recipe.findByIdAndRemove("5dc2f3069c2b24492c2a6552")
  .then("The value is successfully removed")
  .catch("error");

