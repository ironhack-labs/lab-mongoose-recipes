const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: [],
  cousine: String,
  dishType: String,
  image: String,
  duration: Number,
  creator: tring,
  created: Date
})