const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {Schema,model} = require("mongoose");

const recipeSchema = new Schema({

title:{
  type: String,
  required: true,
  unique: true,
},
level:{
  type: String,
  enum:["Easy Peasy","Amateur Chef","UltraPro Chef"]
},
ingredients:{
  type:[String]
},
cuisine:{
  type: String,
  required: true,
},
dishType:{
  type: String,
  Default:"https://images.media-allrecipes.com/images/75131.jpg" 
},
duration:{
  type: Number,
  minimum: 0
},
creator:{
  type: String
},
created:{
  type: Date,
  default: today
}


},{timetamps:true});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = model ("Recipe",userSchema)
