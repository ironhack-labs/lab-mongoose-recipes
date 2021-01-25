const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Iteration 1
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'Ultra Pro Chef'] },
  ingredients: { type: [ String ]},
  cuisine: { type: String, required: true},
  dishType: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date , default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
