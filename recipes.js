const Recipe = require('./models/recipes.model');
const data = require('./data.js');
//const mongoose = require('mongoose');

// Init mongodb connection
require('./configs/db.config');

let receta = {
  title: 'Mojo Picon',
  level: 'Amateur Chef',
  ingredients: ['Cilantro', 'Pimienta Palmera', '30 gr aceite', '1 cucharadita de sal'],
  cuisine: 'Canaria',
  dishType: ['Dish'],
  image: 'https://fotos00.laopinion.es/2014/10/15/646x260/mojo.jpg',
  duration: 10,
  creator: 'Chicote'
  }

Recipe.create(receta)
.then (recipe => console.info(recipe))
.catch(error => console.error(error))
console.log(receta.title);






/*mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
*/