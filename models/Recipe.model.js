const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title:{
    type:String,
    required:true,
    unique:true
  },
  level:{
    type:String,
    enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    default:'Easy Peasy'
  },
  ingredients:[String],
  cuisine:{type:String, required:true},
  dishType:['breakfast', 'main_course', 'soup', 'snack', 'drink', 'desert', 'other'],
  image: {
    type:String, 
    default:"https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration:{type:Number, minimum :0},
  creator:String,
  created:{type:Date, default:Date.now},
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;