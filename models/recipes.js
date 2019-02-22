const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipeApp', {useNewUrlParser: true}, (err)=>{
  if(err) console.log(err)
  else console.log("connected");
});

const Schema = mongoose.Schema

// Create Model 'Movie'
const Recipes = mongoose.model('Recipes', new Schema({
  title: String,
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: String,
  duration: Number,
  creator: String,
  created: Date
}));

module.exports = Recipes