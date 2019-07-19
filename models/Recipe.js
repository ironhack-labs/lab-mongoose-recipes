//const mongoose = require('mongoose');
const mongoose = require('../index')
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title : String,
  level : String,
  ingredients : Array,
  cuisine : String,
  dishType : String,
  image : String,
  duration : Number,
  creator : String,
  created : Date
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

const newRecipe = new Recipe({title : "Ratatouille", level : "Easy", ingredients : ["tomatoes", "eggplants", "zucchini", "onions"], cuisine : "French", dishType : "Maindish", image : "#", duration : 10, creator : "Lison", created : "2019-07-19"})

Recipe.create(newRecipe)
  .then(recipe1 => {
    console.log(recipe1.title)
  })
  .catch(err => {
    console.log(err)
  })
