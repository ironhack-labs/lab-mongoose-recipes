const mongoose = require('mongoose')
const Schema = mongoose.Schema

// fix the deprecation warning:
// "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes
mongoose.set('useCreateIndex', true)

const recipeSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: ': https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe
