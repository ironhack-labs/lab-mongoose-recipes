const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title : { type:String, require:true, unique:true},
  level : { type:String , enum:['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: {type:Array},
  cuisine: { type:String, require:true},
  dishType: { type:String, enum:['Breakfast','Dish','Snack','Dessert','Other']},
  duration : { type:Number, min:0},
  creator: { type:String},
  created: { type:Date, default: Date.now()}
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
