const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title:String,
  ingredients: Array,
  cusine: String,
  dishType:String,
  image: {type:String ,default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: Number,
  creator: String,
  created: Date,
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']}
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
