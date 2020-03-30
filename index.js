const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Our custom recipe
const strogonoff = new Recipe({
	title: 'Strogonoff',
	level: 'Easy Peasy',
	ingredients: ['Chicken', 'Champignom', 'Ketchup', 'Garlic', 'Mustard', 'Onions', 'Table Cream', 'Pepper'],
	cuisine: 'Brazillian',
	dishType: 'Main_course',
	duration: 30,
	creator: 'Chef Bruno'
});

const run = async () => {
	// Connecting to the database
	try {
		const self = await mongoose.connect(MONGODB_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log(`Connected to the database: "${self.connection.name}"`);
		await self.connection.dropDatabase();

		// Adding our own recipe
		const recipe = await Recipe.create(strogonoff);
		console.log(`New recipe added: ${recipe.title}`);

		// Adding all given recipes
		const recipes = await Recipe.insertMany(data);
		recipes.forEach(recipe => console.log(`New recipe added: ${recipe.title}`));

		// Updating a recipe
		const updatedRecipe = await Recipe.findOneAndUpdate(
			{
				title: 'Rigatoni alla Genovese'
			},
			{
				duration: 100
			},
			{
				new: true
			}
		);
		console.log('A recipe has been updated:', updatedRecipe);

		// Deleting a recipe
		await Recipe.deleteOne({
			title: 'Carrot Cake'
		});
		console.log('A recipe has been deleted');

		// Disconnecting from the database
		await mongoose.disconnect();
		console.log(`Disconnected to the database: "${self.connection.name}"`);
	} catch (err) {
		console.log('Error:', err);
	}
};

run();
