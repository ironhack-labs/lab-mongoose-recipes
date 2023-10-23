const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
      type: String,
      unique: true,
      required: true
    },
    level: { 
      type: String, 
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] 
    },
    
    ingredients: {
      type: [ String ], //Array of String
      default: "imag/url/in/here",
    },
    cuisine: {
      type:String,
      required:true
    },
    dishType: {
      type: String,
      enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"] 
      },
    image: {
      type:String,
      default: "https://images.media-allrecipes.com/images/75131.jpg"
    }, 
    duration: {
      type:Number,
      min: 0
    },
    creator: {
      type:String
    },
    created:{
      type:String,
      default: Date.now //today
    }
    
    });
  

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
