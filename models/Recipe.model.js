const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The title is required'], 
    unique: [true, 'The title it must be unique'] 
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] 
  },
  ingredients: {
    type: [String] 
  },
  cuisine: {
    type: String,
    required: [true, 'The cuisine is required'] 
  },
  disType: {
    type: String,
    enum: ["main_course", "soup", "snack", "drink", "dessert", "other"] 
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg" 
  },
  duration: {
    type: Number,
    min: 0 
  },
  creator: {
    type: String, 
  },
  created: {
    type: Date,
    default: Date.now 
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);


module.exports = Recipe;

