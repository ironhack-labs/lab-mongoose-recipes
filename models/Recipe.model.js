const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: {
    type: [ String ]
  },
  cuisine: {
    type: String,
    required: true,
    trim: true,
  },
  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"],
    trim: true,
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: new Date().toLocaleDateString(),
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
