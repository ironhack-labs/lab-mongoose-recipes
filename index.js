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
		const recipeOne = {
			title: "Our recipe",
			cuisine: "Momma's Cookin'",
		};

		const recipeDB = Recipe.create(recipeOne);
		return recipeDB;
	})
	.then((recipeDB) => {
		console.log("Our recipe title: ", recipeDB.title);
	})
	.then(() => {
		return Recipe.insertMany(data);
	})
	.then(() => {
		return Recipe.find();
	})
	.then((allRecipesDB) => {
		console.log("Titles of all recipes in DB");
		return allRecipesDB.forEach((recipe, index) => {
			console.log(`${index + 1}: `, recipe.title);
		});
	})
	.then(() => {
		return Recipe.findOneAndUpdate(
			{ title: "Rigatoni alla Genovese" },
			{ duration: 100 },
			{ new: true }
		);
	})
	.then((rigatoni) => {
		if (rigatoni.duration === 100) {
			console.log("Duration updated sucessfully: ", rigatoni.duration);
		} else {
			console.log("Duration not updated");
		}
		return rigatoni;
	})
	.then(() => {
		return Recipe.deleteOne({ title: "Carrot Cake" });
	})
	.then((carrotCake) => {
		if (carrotCake.deletedCount > 0) {
			return console.log("Successfully deleted Carrot Cake");
		} else {
			return console.log("Did not delete Carrot Cake");
		}
	})
	.then(() => {
		mongoose.connection.close();
	})
	.catch((error) => {
		console.error("Error connecting to the database", error);
	});
