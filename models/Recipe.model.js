const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgPath ='/path'

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    default: 'Easy Peasy',
  },
  ingredients : [String],
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    value: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },

  image:{
    type: String, 
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },

  duration: {
    type: Number,
    minlength: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
