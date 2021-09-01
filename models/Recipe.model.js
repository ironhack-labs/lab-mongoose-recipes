const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

  title: {
    type: String,
    unique: true,
    default: 'Nombre desconocido'
  },

  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'Blanco', 'UltraPro Chef']
  },

  ingredients: [String],

  cuisine: {
    type: String,
    required: true,
    default: 'Nombre desconocido'
  },

  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },

  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"

  },

  duration: {
    type: Number,
    min: 0
  },

  creator: String,

  created: {
    type: Date,
    default: Date.now()
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
