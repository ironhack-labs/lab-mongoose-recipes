const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    unique: true
  },
  
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'soup', 'UltraPro Chef']
  },

  ingredients: {
    type: [String]
  },

  cuisine: {
    type: String
  },

  dishType: {
    type: ['breakfast', 'main_course', 'soup', 'snack', 'desert']
  },

  image: {
    type: String
  },

  duration: {
    type: Number,
    min: 1
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
