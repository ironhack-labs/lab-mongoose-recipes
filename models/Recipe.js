const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'], default: 'Easy Peasy' },
    ingredients: Array,
    cuisine: String,
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'], default: 'Breakfast' },
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min: 0 },
    creator: String,
    created: { type: Date, default: new Date() }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;