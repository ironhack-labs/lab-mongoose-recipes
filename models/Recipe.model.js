const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//1..- Esquema de Receta 
const recipeSchema = new Schema({
  // TODO: write the schema
  title:String,
  level:String,
  ingredients:[String],
  cuisine:String,
  dishType:String,
  image:{
    type:String,
    default:"https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration:Number,
  creator:String,
  create:{
    type:Date,
    default:Date.now
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
