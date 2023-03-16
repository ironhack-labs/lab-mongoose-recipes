const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI)
	.then((x) => {
		console.log(`Connected to the database: "${x.connection.name}"`);
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany();
	})
	.then(() => {
		const newRecipe = Recipe.create({
			title: 'Baklava',
			level: 'UltraPro Chef',
			ingredients: [
				'1 pound chopped nuts (almonds, walnuts, or pistachios are best, or use a combination of them)',
				'1 pound phyllo dough, thawed',
				'1 cup butter, melted',
				'1/3 cup sugar',
				'1 teaspoon ground cinnamon',
				'1/3 teaspoon ground cloves',
			],
			cuisine: 'Bosnian',
		});
	})

	.then(() => {
		return Recipe.insertMany(data);
	})

	.then(() => {
		return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(() =>
			console.log('Updated Successfuly'),
		);
	})
	.then(() => {
		return Recipe.findOneAndDelete({ title: 'Carrot Cake' }).then(() => {
			console.log('Deleted Successfuly');
			mongoose.connection.close();
		});
	})

	.catch((error) => {
		console.error('Error connecting to the database', error);
	});
