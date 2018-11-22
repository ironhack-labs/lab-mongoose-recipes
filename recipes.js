const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const levels = ['Easy Peasy','Amateur Chef','UltraPro Chef']
const dishes = ['Breakfast','Dish','Snack','Drink','Desert','Other']

const recipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: levels},
    ingredients: [],
    cuisine: {type: String, required: true},
    dishType: {type: String, enum: dishes},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: Date.now},
})



module.exports = mongoose.model('Recipe', recipeSchema)
