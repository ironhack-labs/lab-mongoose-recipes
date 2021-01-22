const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    tye: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: {
    type: [String],
  },
  cuisine: {
    type: String,
    required: true,
  },
  dishType: String,
  image: {
    type: String,
    default: `https://images.media-allrecipes.com/images/75131.jpg`,
  },
  durantion: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: Date,
  default: Date.now,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
