const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: {
    Type: String,
    required: true,
    unique: true
  },
  level: {
    Type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: [],
  cuisine: {
    Type: String,
    required: true
  },
  dishType: {
    Type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    Type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    Type: Number,
    Min: 0
  },
  creator: {
    Type: String
  },
  created: {
    Type: Date,
    default: Date.now()
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe
