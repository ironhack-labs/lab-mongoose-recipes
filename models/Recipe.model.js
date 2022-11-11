const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
  },
	level: {
    type: String,
  },
	ingredients: {
    type: [String],
  },
	released: {
    type: Date,
  },
  cuisine: {
    type: String,
  },
  dishType: {
    type: String,
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String,
  },
  created: Date
  
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

