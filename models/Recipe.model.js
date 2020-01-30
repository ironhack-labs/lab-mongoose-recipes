//Requiring mongoose and saving it to a const.
const mongoose = require('mongoose');
//Create a mongoose.Schema saved to a const var named Schema.
const Schema = mongoose.Schema;

//With what was declared before, we create a new instance of Schema called recipeSchema which will receive all the key-value detailed within of the specific type
//and conditions.
const recipeSchema = new Schema({
  title: {type: String, required: true}, //Requires the value.
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']}, //Can just be of these three values.
  ingredientes: Array, //Shorthand type Array.
  cuisine: {type: String, required: true} , //Requires the value.
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},//Not sure if this is possible value. As far as I know, enum is for strict ones.
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},//Type string value with a default of the corresponding image.
  duration: {type: Number, min: 0},//Minium value for this number 0.
  creator: {type: String}, 
  created: {type: Date, default: Date.now}//Default value is the date for present time.
});

//Creates a moongose model saved in a const Recipe, that will be called Recipe and with the recipeSchema characteristics.
const Recipe = mongoose.model('Recipe', recipeSchema);
//Export the const Recipe that we just created to be used in other files.
module.exports = Recipe;


