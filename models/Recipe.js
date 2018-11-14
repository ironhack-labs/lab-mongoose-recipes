const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const recipeSchema = new Schema({
    title    : { type: String, required, unique},
    level    : { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients : { type: Array},
    cuisine : { type: String, required},
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack','Drink', 'Dessert', 'Other']},
    image: { type: String, default: 'images/default-avatar.png' },
    duration: {type: Number, min:0},
    creator: {type: String},
    created: {type: Date, default: Date.now}
  });

  //Creo una constante deonde creo mi modelo.
  const Recipe = mongoose.model('Recipe', recipeSchema);
  //Exporto mi modelo para poder usarlo en otros archivos.
  module.exports = Recipe;