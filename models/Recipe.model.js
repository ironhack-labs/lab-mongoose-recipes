const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String, 
  level: String,
  ingredients: [ String],
  cuisine: {
    type: string,
    required: true
  },
  dishType: {
    type: string,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  image : {
    type: string,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: string,
  created: {
    type: Date,
    default: new Date()
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
