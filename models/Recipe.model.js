const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true
  },

  //enum: ['Marrón', 'Negro', 'Blanco', 'Varios']
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: [String]
  },
  cuisine: {
    type: String
  },
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  image: {
    type: String,
    default: 'Nombre desconocido'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String,
  },
  created: {
    type: String,
    default: Date.now
  },


});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
