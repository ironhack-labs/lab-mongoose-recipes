/* const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
}); */

const {Schema, model} = require("mongoose");

/* const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe; */

const recipeSchema = new Schema({
  title:{
    type:String,
    required:true,
    unique:true
  },
  level:{
    type:String,
    enum:['Easy Peasy',' Amateur','Chef','UltraPro Chef'],
    default:'otro'
  },
  ingredients:{
    type:[ String ]
  },
  cuisine:{
    type:String,
    required:true
  },
  dishType:{
    type:String,
    enum:['breakfast',' main_course','soup','snack','drink','dessert'],
    default:'other'
  },
  imagen:{
    type:String,
    default:"https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration:{
    type:Number
  },
  creator:{
    type:String
  },
  created:{
    type:Date,
    default:"today"
  }

},{timestamps:true})

module.exports = model('Recipe', recipeSchema)