const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema

  title: {
    type: String,
    required: true,
    unique: true //check unique properties
  },

  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },

  // [QUESTION: do we have to create a property inside an object if there's only one property?]
  ingredients: {
    type: [String],
  },

  cuisine: {
    type: String,
    required: true
  },

  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },

  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
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
    default: new Date() // object that created a new data with current date 

  },


});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
