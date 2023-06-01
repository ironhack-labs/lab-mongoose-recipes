/** @format */

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI)
	.then((x) => {
		console.log(`Connected to the database: "${x.connection.name}"`);
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany();
	})
	.then(() => {
		// Run your code here, after you have insured that the connection was made
		const recipeOne = {
			title: "Bean Soup",
			level: "Amateur Chef",
			ingredients: [
				"beans",
				"selderij",
				"carrots",
				"onions",
				"olive oil",
				"tomato juice",
			],
			cuisine: "mediterranean",
			dishType: "soup",
			duration: 20,
			creator: "Fernando & Greg",
		};

		return Recipe.create(recipeOne);
	})
	.then((response) => {
		console.log(`the title of the recipe is:`, response.title);

		return Recipe.insertMany(data);
	})
	.then((recipesTitles) => {
		recipesTitles.forEach((element) => {
			console.log(element.title);
		});

		return Recipe.findOneAndUpdate(
			{ title: "Rigatoni alla Genovese" },
			{ duration: 100 },
			{ returnDocument: "after" }
		);
	})
	.then((rigatoni) => {
		console.log(rigatoni.duration);
		console.log("Rigatoni duration updated");

		return Recipe.deleteOne({ title: "Carrot Cake" });
	})
	.then((deleted) => {
		console.log(`We don't like Carrot Cake anymore. That's ENOUGH`, deleted);

		mongoose.connection.close();
	})

	.catch((error) => {
		console.error("Error connecting to the database", error);
	});
