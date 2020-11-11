const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Desconocido',
    trim: true,
    set: text => text.charAt(0).toUpperCase() + text.substring(1)
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: {
    type: [String],
  },
  cuisine: {
    type: String,
    required: true,
    default: 'Desconocido',
    trim: true,
  },
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup','snack', 'drink', 'dessert','other'],
  },
  image: {
    type: String,
    required: true,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  }

}, {
timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
