const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Our custom recipe
const strogonoff = new Recipe({
	title: "Strogonoff",
	level: "Easy Peasy",
	ingredients: ["Chicken", "Champignom", "Ketchup", "Garlic", "Mustard", "Onions", "Table Cream", "Pepper"],
	cuisine: "Brazillian",
	dishType: "Main_course",
	duration: 30,
	creator: "Chef Bruno"
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
	} catch (err) {
		console.log("Error connecting to the database", err);
	}

	// Adding our own recipe
	try {
		const recipe = await Recipe.create(strogonoff);
		console.log(`New recipe added: ${recipe.title}`);
	} catch (err) {
		console.log("Error adding new recipe to the database", err);
	}

	// Adding all given recipes
	try {
		const recipes = await Recipe.insertMany(data);
		recipes.forEach(recipe => console.log(`New recipe added: ${recipe.title}`));
	} catch (err) {
		console.log("Error adding new recipes to the database", err);
	}

	// Updating a recipe
	try {
		const updatedRecipe = await Recipe.findOneAndUpdate(
			{
				title: "Rigatoni alla Genovese"
			},
			{
				duration: 100
			},
			{
				new: true
			}
		);
		console.log("A recipe has been updated:", updatedRecipe);
	} catch (err) {
		console.log("Error updating recipe in the database", err);
	}

	// Deleting a recipe
	try {
		await Recipe.deleteOne({
			title: "Carrot Cake"
		});
		console.log("A recipe has been deleted");
	} catch (err) {
		console.log("Error deleting recipe in the database", err);
	}

	// Disconnecting from the database
	try {
		await mongoose.disconnect();
		console.log(`Disconnected to the database: "${self.connection.name}"`);
	} catch (err) {
		console.log("Error disconnecting to the database", err);
	}
};

run();
