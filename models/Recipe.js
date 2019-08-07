const mongoose = require('mongoose');
// getting access to Schema class from mongoose
const Schema = mongoose.Schema;

// define the STRUCTURE of documents in the collection
const recipeSchema = new Schema({
  // TODO: write the schema
    title: {
      type: String,
      required: true,
      unique: true
    },
    leveL : {
      type: String,
      enum: [`Easy Peasy`,`Amateur Chef`,`Ultra Pro Chef`]
    },
    ingredients: [{type: String}],
    cuisine: {
      type: String,
      required: true
    },
    dishType: {
      type: String,
      enum: [`Breakfast`,`Dish`,`Snack`,`Drink`, `Dessert`, `Other`]
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: {
      type: String
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
