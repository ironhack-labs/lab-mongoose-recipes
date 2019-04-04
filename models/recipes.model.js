const mongoose = require('mongoose');
//creamos nuestra bbdd
const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true 
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: {
    type: Array,
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: Boolean,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
      type: Number,
      min: 0
  },
  creator: {
      type: String
  },
  created : {
      type: Date,
      default: new Date()
  }
});

const Recipes = mongoose.model('Recipes', userSchema);
module.exports = Recipes;