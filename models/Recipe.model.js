const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },

  ingredients: {
    type: [String],
    trim: true
  },

  cuisine: {
    type: String,
    required: true,
    trim: true
  },

  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"],
    trim: true,
    lowercase: true
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
    type: String
  },

  created: {
    type: Date,
    default: Date.now()
  }

}, {
  timestamps: true

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
