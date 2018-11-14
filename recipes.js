const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
    .then(() => {
        console.log('Connected to Mongo!');
    }).catch(err => {
        console.error('Error connecting to mongo', err);
    });


const recipe = new Schema({
    title: { type: String, unique: true },
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    Ingredients: { type: Array },
    Cuisine: { type: String, required: true },
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
    Image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    Duration: { type: Number, min: 0 },
    Creator: { type: String },
    created: { type: Date, default: Date.now }
});