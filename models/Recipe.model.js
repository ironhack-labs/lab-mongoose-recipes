const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title:{
    type:String,
    unique:true
  },
  level:{
    type:String,
    enum:["Easy Peasy","Amateur Chef","UltraPro Chef"],
    default:"Easy Peasy"
  },
  ingredients:{
    type:Array
  },
  cuisine:{
    type:String,
    required:true
  },
  dishType:{
    type:String,
    enum:["breakfast","main_course","soup","snack","drink","dessert","other"],
    default:"breakfast"
  },
  image:{
    type:String,
    default:"https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration:{
    type:Number,
    min:0
  },
  creator:{
    type:String
  },
  created:{
    type:Date,
    timestamps:true,
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
