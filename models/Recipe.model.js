const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: [String],
  cuisine: { type: String, required: true },
  dishtype: {
    type: String,
    validate: {
      validator: (text) => {
        return text === "Breakfast" || text === "Dish" || text === "Snack" || text === "Drink" || text === "Dessert" || text === "Other";
      },
      message: "Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other"
    }
  },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: {type: String, min: 0},
  creator: String, 
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
