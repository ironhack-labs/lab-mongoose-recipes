const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    // TODO: write the schema
  title: String,
  level: {type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg.'},
  duration: Number,
  creator: String,
  created: Date
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

