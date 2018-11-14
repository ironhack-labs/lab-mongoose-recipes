const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

//Importamos nuestro esquema, indicando la ruta
const Recipe = require('./models/RecipeSchema.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


//Primera insercion a la BBDD, si la BBDD no esta creada la crea.
Recipe.create({title: 'Recipe 1', level: 'Easy Peasy', ingredients: ['Tomatoe','Fish'], cuisine: 'Spanish'
, dishType : 'Dish',duration: 120, creator: 'Sandra' })
  .catch(err => { console.log('An error happened:', err) })
  

//Añadimos varias recetas a la vez del archivo data.js

Recipe.insertMany(data);