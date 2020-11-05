const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title:{
    type: String,
    required:true,
    unique:true},
  level:{
    type: String,
    enum:["Easy Peasy", "Amateur Chef","UltraPro Chef"]
  },
  ingredientes:{type:[String]},
  cuisine: {
  type: String,
  required:true},
  dishType:{
    type: String,
    enum:["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
  },
  image:{
    type: Number,
  default:'https://images.media-allrecipes.com/images/75131.jpg'
 },
 duration: {
  type: Number,
min:0
},
created:{
  type:Date, 
default:0}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
