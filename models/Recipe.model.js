const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type:String,
    required:true,
    unique:true},
  level: {
    type: String,
     enum: ['Easy Peasy','Amateur Chef','UltraPro Chef'] },
  ingredients: {
    type: [String]
  },
  cuisine:{
    type: String,
    require: true
  } ,
  dishType:{
    type: String,
    enum: ['breakfast','main_course','soup','snack','drink','dessert','other']
  },
  image:{
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"

  },
  duration:{
    type: Number,
    minimun: 0
  },
  creator: {
    String},
  create:{
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
