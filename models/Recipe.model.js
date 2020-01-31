const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: String,
  level: {
    type: String,
    validate: str => {
      if (
        str.startsWith("Easy Peasy") ||
        str.startsWith("Amateur Chef") ||
        str.startsWith("UltraPro Chef")
      ) {
        return true;
      }
      return false;
    }
  },
  ingredients: Array,
  cuisine: {
    type: String,
    require: true
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
    minlength: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
