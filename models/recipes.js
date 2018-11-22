const mongoose = require('mongoose')
var Schema = mongoose.Schema

var recipeSchema = new Schema({
  title:{
    type: String,
    required: true,
    unique: true,
  },

  level:{
    type: String,
    enum: ['Easy Peasy', 'amateur Chef', 'UltraPro Chef']
  },

  ingredients: Array,

  cuisine:  {
    type: String,
    require: true,
  },

  dishType: {
    type: String,
    enum: ['breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'other']
  },

  image: {
    type: String,
    default: ''
  },

  duration:{
    type: Number,
    min: 0,
    },

    creator: String,

    created:{
      type:Date,
      default: new Date()
    }
    },{
      timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
})

module.exports = mongoose.model('Recipe', recipeSchema)