const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');




const recipe = new Schema({
    title: { type: String, unique: true },
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    ingredients: { type: Array },
    cuisine: { type: String, required: true },
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min: 0 },
    creator: { type: String },
    created: { type: Date, default: Date.now }
});
mongoose.connect('mongodb://localhost/recipeApp')
    .then(() => {
        console.log('Connected to Mongo!');
    }).catch(err => {
        console.error('Error connecting to mongo', err);
    })



const Recipe = mongoose.model('Recipe', recipe);
module.exports = Recipe;
Recipe.collection.drop();


Recipe.create({ title: 'lasagne', level: 'Easy Peasy', ingredients: 'carne,tomate', cuisine: 'Street food', dishType: 'Dish', image: 'https://images.media-allrecipes.com/images/75131.jpg', duration: 30, creator: 'Italia' })
    .then(recipe => { console.log('The user is saved and its value is: ', recipe.title) })
    .then(() => { Recipe.insertMany(data) })
    .catch(err => { console.log('An error happened:', err) });