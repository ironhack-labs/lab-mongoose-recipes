const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schemaname: 
  title: { 
    unique: true,
    type: String,
    required: true,
  },

  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },

  ingredients: {
     type: [String],   
  },

  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Main_course', 'Soup', 'snack', 'drink', 'drink', 'dessert', 'other',],
  },

  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    ninimun: 0 ,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: '2022-04-13s'
  },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
