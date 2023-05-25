const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String
  },
  level: {
    type: String
  },
  ingredients: {
    type: [ String ]
  },
  cuisine: {
    type: String
  },
  dishType: {
    type: String
  },
  image: {
    type: String
  },
  duration: {
    type: Number
  },
  creator: {
    type: String
  },
  created: {
    type: Date
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
