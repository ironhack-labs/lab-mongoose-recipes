const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {type: String},
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    default: 'Easy Peasy'
  },
  ingredients: [],
  cuisine: {
    type: String,
    required: true 
  },
  dishType: {type: String},
  image: {
    type:  String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    minimun: 0
  },
  creator: {type: String},
  created: {
    type: Date,
    default: Date.now
      }

});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

