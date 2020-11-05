const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  // title - Type String.It should be required and unique.
  title: {
    type: String,
    required: true,
    unique: true
  },
  // level - Type String.Can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef(remember the enum validator).
  level: {
    type: String,
    enum: ["Easy Peasy" , "Amateur Chef" , "UltraPro Chef"]
  },
  // ingredients - Type Array of Strings(represented as[String]).
  ingredients: {
    type: [ String ],
  },
  // cuisine - Type String.Should be required.
  cuisine: String,
  // dishType - Type String.Possible values: breakfast,  main_course,  soup,  snack,  drink,  dessert or other.
  dishType: String,
  // image - Type String.Default value: "https://images.media-allrecipes.com/images/75131.jpg".
  image: String,
  // duration - Type Number.The minimum value should be 0.
  duration: Number,
  // creator - Type String.
  creator: String,
  // created - Type Date.By  default,  today.
  created: Date

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
