
//esto se pone siempre:
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
//aquí abajo hago el esquema con este formato.
const recipeSchema = new Schema({
  title: { type: String, required:true, unique:true},
  level : { type: String, enum: ['Easy Peasy', 'Amateur Chef ', 'UltraPro Chef']},
  ingredients: { type: Array},//aqui se puede poner ingredients: [],
  cuisine: { type: String, required:true},
  dishType: { type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert,Other']},
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min:0},
  creator: { type: String}, //si solo pones el tipo puedes poner String directamente.
  created:{ type: Date, default: Date.now},
});
//aquí abajo exporto el modelo. el nombre de const es el que quieras (Recipe)
//  y dentro del parentesis lo pongo otra vez, el nombre como he llamado al esquema
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

