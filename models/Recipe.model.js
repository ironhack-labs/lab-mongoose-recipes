const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  level: {
    type: Schema.Types.String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [Schema.Types.String],

  cuisine: {
    type: Schema.Types.String,
  },
  dishType: {
    type: Schema.Types.String,
    enum: [
      "breakfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },
  image: {
    type: Schema.Types.String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Schema.Types.Number,
    min: 0,
  },
  creator: {
    type: Schema.Types.String,
  },
  created: {
    type: Schema.Types.Date,
    default: new Date(),
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
