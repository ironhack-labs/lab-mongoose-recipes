const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
  // TODO: write the schema
  title:{
    type: String,
    unique: true,
    require: true
  },
  level:  {
    type: String,
    default: "Easy Peasy",
    enum: ["Easy Peasy", "Amateur Chef","UltraPro Chef"]
  
  },
  ingredients: {
    type: [String]
  },
  cuisine: {
    type: String,
    require: true
  },
  dishType:{
    type: String,
    default: "breakfast",
    enum: [`breakfast`, `main_course`, `soup`, `snack`, `drink`, `dessert`, `other`]
  
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"

  },
  duration: {
    type:Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
