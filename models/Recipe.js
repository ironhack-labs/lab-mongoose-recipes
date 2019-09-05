const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title:{
   type: String,
   //required: true,
  },
  level:{
    type: String,
    //required: true,
   },
   ingredients:{
     type:Array
   },
   cuisine:{
    type: String,
    //required: true,
   },
   dishType:{
    type: String,
    //required: true,
   },
   image:{
    type: String,
    //required: true,
   },
   duration:{
    type: String,
    //required: true,
   },
   creator:{
    type: String,
   },
   created:{
    type: String,
    default: Date.now,
   },

});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
