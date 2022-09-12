const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true
  },
  level:String,
  ingridients: [String],
  cuisine: String,
  dishType: String,
  images:{
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
   type:Number,
   min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
