const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: String,
  duration: Number,
  cook: { type : ObjectId, ref: 'cooks' }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
