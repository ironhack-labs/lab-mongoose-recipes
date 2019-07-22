const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title : String, required: true,
  level : String, required : ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  ingredients : Array,
  cuisine : String, required : true,
  dishType : String, required : [ "Breakfast", "Dish", "Snack",  "Drink", "Dessert", "Other"],
  image : String,
  duration : Number,
  creator : String, 
  created : {type : Date, default : Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
