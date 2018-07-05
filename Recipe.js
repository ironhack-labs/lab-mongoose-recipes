const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')



const newRecipeSchema = new Schema({
  title: String,
  level:{
    type:String,
    enum:['Easy Peasy','Amateur Chef','UltraPro Chef']
  },
  ingredient: [String],
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
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
});

module.exports = mongoose.model('Recipe', newRecipeSchema)