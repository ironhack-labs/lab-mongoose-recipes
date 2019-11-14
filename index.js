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

Recipe.create({
	title: 'A recipe',
	level: 'Amateur Chef',
	ingredients: [ 'Ingredient 1', 'Ingredient 2' ],
	cuisine: 'International',
	dishType: 'Dish',
	duration: 120,
	creator: 'Berna'
})
	.then((res) => {
		console.log(res.title);
	})
	.catch((err) => {
		console.log(err);
	});

Recipe.insertMany(data)
	.then((res) => {
		res.forEach((dish) => {
			console.log(dish.title);
		});
	})
	.catch((err) => {
		console.log(err);
	});

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
	.then((res) => {
		console.log('title updated');
	})
	.catch((err) => {
		console.log(err);
	});

Recipe.deleteOne({ title: 'Carrot Cake' })
	.then((res) => {
		console.log('deleted');
		mongoose.disconnect();
	})
	.catch((err) => {
		console.log(err);
	});
