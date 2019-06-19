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
		console.error('Error connecting to Mongo', err);
	});


// create recipe
function createRecipe() {
	Recipe.create({
		title: 'pastaaa',
		level: 'Easy Peasy',
		ingredients: [ 'pasta', 'bueno bueno' ],
		cuisine: 'Italian',
		dishType: 'Dish',
		// image,
		duration: 10,
		creator: 'Bambino'
		// created,
	})
		.then((res) => {
			console.log('recipe created');
		})
		.catch((err) => {
			console.log(err);
		});
}

// update recipe
function updateRecipe(id) {
	Recipe.findByIdAndUpdate(id, { duration: 100 })
		.then((res) => {
			console.log('recipe updated', res);
		})
		.catch((err) => {
			console.error(err);
		});
}
updateRecipe('5d0a4fa0dbd2ec0e8a5543a3');


// delete recipe
Recipe.deleteOne({ title: 'Carrot Cake' })
	.then((res) => {
		console.log('recipe deleted', res);
	})
	.catch((err) => {
		console.error(err);
	});

  mongoose.connection.close()

