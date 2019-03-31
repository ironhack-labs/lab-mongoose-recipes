const mongoose = require('mongoose');
//const Schema   = mongoose.Schema;
//añadimos el modelo
const Recipe = require('./models/recipe.model');
const recipes = require('./data.js');
//conectdos a la bbdd
require('./configs/db.config');

//Crear una receta
//const example = {
  //isHuman: false,
  //printIntroduction: function () {
    //console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  //}
//};
const recipe = {
  title: 'Flan de huevo',
  level: 'Amateur Chef',
  ingredients: [
    '5 huevos', 
    '1 taza de azúcar', 
    '1 taza de polvo de hada', 
    '4 yogures', 
    '1 1/2 taza de miel', 
    '1 taza de aceite', 
    '2 teaspoons vanilla extract', 
    '1 taza de entusiasmo', 
    '3 tazas de aroma de vainilla'],
  cuisine: 'Española',
  dishType: ['Postre'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
  duration: 53,
  creator: 'Chef Patri'
}
