const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
  
  title: { type: String , required :'Title is required!'} ,
  level: { type: String, enum : [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients :{type: Array},
  cuisine :{ type: String , required :' Cuisine is required'},
  dishtype: { type: String, enum : ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: ' https://images.media-allrecipes.com/images/75131.jpg.'},
  duration :{type: Number, min:6},
  creator: {type: String},
  created :{type: Date, default:Date.now},
},
  {timestamps:true}
 
);

const OneRecipe = mongoose.model('OneRecipe', recipeSchema);
module.exports = OneRecipe;

