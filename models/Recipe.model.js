const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: String,
  required: true,
  unique: true,
  level: {
    type: String,
    enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']
  },
  ingredients: [String],
  dishType: {
    type: String,
    enum:['breakfast','main_course','soup','snack','drink','dessert','other']
  },
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: Date.now()
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
