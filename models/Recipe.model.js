const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('strictQuery', true)

const recipeSchema = new Schema({
  title: String,
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: [String],
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['breakfast', 'main_course', 'soup', 'snack', 'dring', 'dessert', 'other']},
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: Number,
  creator: String,
  created: { type: Date, default: Date() }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
