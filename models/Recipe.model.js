const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let date = new Date()
const recipeSchema = new Schema({
    // TODO: write the schema
    title: { type: String, required: true, unique: true },
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    ingredients: { type: [String] },
    cuisine: { type: String, required: true },
    dishTypes: { type: String, enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'] },
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
    durations: { type: Number, min: 0 },
    creator: String,
    created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;