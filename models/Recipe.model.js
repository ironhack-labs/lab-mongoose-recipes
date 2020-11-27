const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
   title : {
    type: String,
    required:true,
    unique:true,
  },
  level: {
    type: String,
    enum : ["Easy Peasy", "Amateur Chef" , "UltraPro Chef"],
  },
  ingredients: {
    type: [String],
  },
  cuisine:{
    type : String,
    require:true,
  },
  dishType:{
    type: String,
    enum :[" breakfast", "main_course", "soup", "snack", "drink", "dessert"]
    
  },
  image :{
    type: String,
    default : "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration:{
    type:Number,
    min: 0,
  },
  creator:{
    type:String,
  },
  create:{
    type: Date,
    default: Date.now
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
