const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true
  },
  level:{
    type: String,
    emu: []
  },
  ingredients: {
    type: [String]
  },
  cuisine:{}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
