const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast','Dish', 'Snack','Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: String, min: 0},
  creator: String,
  creted: {type: Date, default: Date.now}
},{timestamps: true});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
