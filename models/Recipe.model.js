const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String },
  level: { type: String, enum: ["Amateur Chef", "UltraPro Chef", "Easy Peasy"] },
  ingredients: { type: [String] },
  cuisine: { type: String },
  dishtype: { type: String, enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"] },
  image: { type: String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
  duration: { type: Number, min: 0 },
  creator: { type: String }
},
{
  timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
