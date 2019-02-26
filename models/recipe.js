const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Iteration 1 - Recipe Schema
const recipeSchema = new Schema ({
    title: String,
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: Array,
    cuisine: String,
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: Date.now }
});

const Recipe = mongoose.model('recipes', recipeSchema);

module.exports = Recipe;