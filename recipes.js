const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//aquí le digo a mi esquema que me sea mandado el modelo para usarlo:
const recipeSchema = require('./models/recipe.js')
//esto de abajo es para conectar con mongo:
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
