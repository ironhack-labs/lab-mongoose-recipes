const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
  },
  level: {
    type: String,
     enum: ['Easy Peasy' , 'Amateur Chef' , 'UltraPro Chef'],
  },
  ingredients: {
    type: [String],
  },
  cuisine: {
    type: String,
    require: true,
  },
  cuisine: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert or other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    minimum: 0
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now()
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
