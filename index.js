const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
	.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to Mongo!');
		// Recipe.create(data[0]).then((recipe) => {
		// 	console.log(recipe);
		// });

		// Recipe.insertMany(data).then((recipes) => {
		// 	recipes.forEach((recipe) => {
		// 		console.log(recipe.title);
		// 	});
		// });

		// Recipe.findOneAndUpdate(
		// 	{ title: 'Rigatoni alla Genovese' },
		// 	{ duration: 100 },
		// 	{ new: true },
		// ).then((recipe) => {
		// 	console.log(recipe);
		// });

		// Recipe.deleteOne({ title: 'Carrot Cake' }).then((recipe) => {
		// 	console.log(recipe);
		// });

		mongoose.connection.close();
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});
