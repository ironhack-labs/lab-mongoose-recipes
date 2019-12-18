const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
	.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to Mongo!');
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

//Recipe creation
Recipe.create({
	title       : 'Lasagna',
	level       : 'Amateur Chef',
	ingredients : 'Pasta',
	dishType    : 'Dish',
	image       : 'https://images.media-allrecipes.com/images/75131.jpg',
	duration    : 30,
	creator     : 'Lasagnoro',
	created     : 03 / 25 / 2015
});
