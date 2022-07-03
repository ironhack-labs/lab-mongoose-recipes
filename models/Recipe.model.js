const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: [true, 'Please insert a title.']
  },
  level: {
    type: String,
    enum : {
    "Easy Peasy" : 1,
    "Amateur Chef" : 2,
    "UltraPro Chef" : 3
  }
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: [true, 'Please inster type of cuisine.']
  },
  dishType: String /*posibles valores "Breakfast, main-course, soup, snack, drink, dessert or other"*/,
  image: String /*Default value "https://images.media-allrecipes.com/images/75131.jpg"*/,
  duration: Number /*minimun value = 0*/,
  creator: String,
  created: Date /*by default today*/
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
