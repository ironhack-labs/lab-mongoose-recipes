const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Schema = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
	.then(() => {
		console.log('Connected to Mongo!')
	}).catch(err => {
		console.error('Error connecting to mongo', err)
	});

const Recipe = new Schema({
	title: String,
	level: { type:String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
	ingredients: Array,
	cousine: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
	dishType: String,
	image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
	duration: {type: Number, min:0 },
	creator: String,
	created: {type: Date, default: Date.now }
});


app.listen(3000, () => {
	console.log('Listening 3000');
});
