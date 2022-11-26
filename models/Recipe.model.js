const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  // Lab incomplete, resolver depois:)
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
