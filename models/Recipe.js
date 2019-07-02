const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
   title: String,
   level: String, enum :["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
   ingredients: Array,
   cuisine: String,
   dishType: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
   image: String, default: 'https://images.media-allrecipes.com/images/75131.jpg.',
   duration: Number, min: 0,
   creator: String,
   created: Date, default: Date.now
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
