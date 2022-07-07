const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: [String],
  cuisine: String,
  dishType: String,
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
    duration: Number,
    creator: String,
    created: {
      type: Date,
      default: Date.now, // Source: https://stackoverflow.com/questions/29899208/mongoose-date-field-set-default-to-date-now-n-days
  },
  // TODO: write the schema
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
