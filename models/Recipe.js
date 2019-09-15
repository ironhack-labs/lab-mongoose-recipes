const {model, Schema} = require('mongoose')

const recipeSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredents: [],
  cuisine: {
    type: String,
    required: true
  },
  dishtype: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: true,
});

module.exports = model('Recipe', recipeSchema)