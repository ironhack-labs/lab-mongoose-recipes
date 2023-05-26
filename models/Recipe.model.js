const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO: write the schema
  /*title - Type String. It should be required and unique.
level - Type String. Can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the enum validator 😉).
ingredients - Type Array of Strings (represented as [ String ]).
cuisine - Type String. Should be required.
dishType - Type String. Possible values: breakfast, main_course, soup, snack, drink, dessert or other.
image - Type String. Default value: "https://images.media-allrecipes.com/images/75131.jpg".
duration - Type Number. The minimum value should be 0.
creator - Type String.
created - Type Date. By default, today.
*/
const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: String,//"https://images.media-allrecipes.com/images/75131.jpg"
  duration: Number,
  creator: String,
  created: Date,
  });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;


