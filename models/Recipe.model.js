const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listOfLevels = ["Easy Peasy", "Amateur Chef", "UltraPro Chef"];
const dishTypes = ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]

const recipeSchema = new Schema({
  // ToDo: write the schema

  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: "Without name"
  },
  level: {
    type: String,
    enum: listOfLevels
  },
  ingredients: {
    type: [String]
  },
  cuisine: {
    type: String,
    required: true,
    trim: true,
  },
  dishType: {
    type: String,
    enum: dishTypes
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0,
    max: 525600 // Si vas a tardar más de un año en hacer una receta, apuntate a un curso no te leas una receta cutre ;)
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: new Date() // COMPROBAR EN COMPASS
  }

}, { timestamps: true }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
