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


Recipe.insertMany(data)
  .then (recipe => {
    for (let i = 0; i < data.length; i++) {
      recipe = new Recipe(data[i]);
      // console.log("===>",recipe);
      Recipe.create(recipe);
    }
  })
.catch(function(err) {
  console.log(err)
});
