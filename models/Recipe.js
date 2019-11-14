const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const recipeSchema = new Schema({
  // TODO: write the schema
    title: { type: String, required: true, unique: true},
    level: { type: String, enum: [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: { type: [] },
    cuisine: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Dessert', 'Other']},
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: { type: Number, default: 0},
    creator: { type: String},
    created: { type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

recipeSchema.plugin(uniqueValidator);
