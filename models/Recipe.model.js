const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
title:{
  type: [String],
  required: true,
  unique:true,
},
level:{
  type: [String],
  enum: ["Easy Peasy", "Amateur Chef","UltraPro Chef"]
},
ingredients:[],
cuisine:{
  type: String,
  required: true,
},
dishtype:{
  type:String,
  enum:["breakfast","main_couse","soup","snack", "drink", "dessert", "others"]
},
image:{
  type:String,
  default:"https://images.media-allrecipes.com/images/75131.jpg"
},
duration:{
  type:Number,
  min:0
},
creator:String,
created:{
  type:Date,
  default: Date.now
}

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
