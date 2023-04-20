const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const express = require("express");
const app = express();

const Recipe = require("./models/Recipe.model");
const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";
const data = require("./data");

// //Iteration 2 - Create a recipe
// const testRecipe = data[0];
// const createRecipeInDB = async () => {
// 	const recipe = await Recipe.create(testRecipe);
// 	console.log(recipe.title);
// };

// const dealRecipesInDB = async () => {
// 	//Iteration 3 - Insert multiple recipes
// 	const recipes = await Recipe.insertMany(data);
// 	recipes.forEach((recipe) => {
// 		console.log(recipe.title);
// 	});

// 	//Iteration 4 - Update recipe
// 	const queryRigatoni = { title: "Rigatoni alla Genovese" };
// 	const update = { duration: 100 };
// 	const recipeToUpdate = await Recipe.findOneAndUpdate(queryRigatoni, update, {
// 		new: true,
// 	});
// 	console.log(recipeToUpdate.duration);

// 	//Iteration 5 - Remove a recipe
// 	const queryCarrot = { title: "Carrot Cake" };
// 	await Recipe.deleteOne(queryCarrot);
// };

app.get("/createManyRecipes", async (req, res) => {
	try {
		const recipes = await Recipe.insertMany(data);

		const recipeTitles = recipes.map((recipe) => {
			return recipe.title;
		});

		res.send(recipeTitles);
		console.log(recipeTitles);
	} catch (error) {
		console.log(error);
	}
});

app.get("/updateRecipe", async (req, res) => {
	try {
		const query = { title: "Rigatoni alla Genovese" };
		const update = { duration: 100 };
		const recipeToUpdate = await Recipe.findOneAndUpdate(query, update, {
			new: true,
		});

		res.send(recipeToUpdate);
		console.log(recipeToUpdate.duration);
	} catch (error) {
		console.log(error);
	}
});

app.get("/deletCarrotCake", async (req, res) => {
	try {
		const query = { title: "Carrot Cake" };
		await Recipe.deleteOne(query);

		const recipes = await Recipe.find();

		const recipeTitles = recipes.map((recipe) => {
			return recipe.title;
		});

		res.send(recipeTitles);
		console.log(recipeTitles);
	} catch (error) {
		console.log(error);
	}
});

mongoose
	.connect(MONGODB_URI)
	.then((x) => {
		console.log(`-----Connected to the database: "${x.connection.name}"-----`);
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany();
	})
	.then(() => {
		app.listen(3000, () => {
			console.log("I am listening at localhost:3000");
		});

		// createRecipeInDB();
		// dealRecipesInDB();
	})
	.catch((error) => {
		console.error("Error connecting to the database", error);
	});
