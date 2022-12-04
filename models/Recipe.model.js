const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title:{
    required: true,
    unique: true,
    type: String
  },
  level: {
    type: String, 
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [String],
  cuisine:{
    type: String,
    required: true
  },
  dishType:{
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
  },
  image:{
    type: String
  },
  duration:{
    type: Number,
    min: 0
  },
  creator: String,
  created:{
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
