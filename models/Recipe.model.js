
//llamo a mongoose
const mongoose = require('mongoose');
//creo el molde
const Schema = mongoose.Schema;
//creo un nuevo molde con todos mis key-values
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: {
    type: [String]
  },
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "dinner"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
});

//NO ENTIENDO
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

