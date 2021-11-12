const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = "https://images.media-allrecipes.com/images/75131.jpg";

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cuisine: {type: String, required: true},
  dishType: {type: String, value: ['breakfast', ' main_course', 'soup', 'snack', 'drink', 'dessert', 'other']},
  image: {type: String, value: url},
  duration: {type: Number, value: {$gt:0}},
  creator: {type: String},
  created: {type: Date, default: Date.now} 
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
