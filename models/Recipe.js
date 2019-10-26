const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: { type: String, default: 'images/default-avatar.png' },
  duration: { type: Number, min: 0 },
  creator: String,
}, {
    timestamps: true
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
