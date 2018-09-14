const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ['easy peasy', 'amateur chef', 'ultrapro chef']
  },
  ingredients: {
    type: Array
  },
  cousine: {
    type: String
  },
  dishType: {
    type: String,
    enum: ['breakfast', 'dish', 'snack', 'drink', 'dessert', 'other']
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    minimum: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)