const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true,
    set: str => str.toLowerCase()
  },
  level: {
    type: String,
    validate: {
      validator: str => {
        if (!"Easy Peasy" && !"Amateur Chef" && !"UltraPro Chef") {
          return false;
        }
        return true;
      },
      message:
        "The level can only be Easy Peasy, Amateur Chef, or UltraPro Chef."
    }
  },
  ingredients: Array,
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    validate: {
      validator: str => {
        if (
          !"Breakfast" &&
          !"Dish" &&
          !"Snack" &&
          !"Drink" &&
          !"Dessert" &&
          !"Other"
        ) {
          return false;
        }
        return true;
      },
      message:
        "The dish type can only be dish, snack, drink, dessert, or other."
    }
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creater: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
