const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
title: {type: String, required: true, unique: true }, //It should be required and unique.
level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] }, //Can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the enum validator 😉).
ingredients: {type: [ String ]},
cuisine: {type: String, required: true}, //Should be required.
dishType:  { type: String, enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']}, //Possible values: breakfast, main_course, soup, snack, drink, dessert or other.
image: {type: String, default:"https://images.media-allrecipes.com/images/75131.jpg"}, //Default value: "https://images.media-allrecipes.com/images/75131.jpg".
duration: { type: Number, min: 0}, //The minimum value should be 0.
creator: {type: String},
created: { type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
