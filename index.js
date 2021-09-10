const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any recipes to the database, let's remove all existing ones
		return mongoose.connection.dropDatabase();
	})
	.then(() => {
		// Run your code here, after you have insured that the connection was made
		// Iteracion 2
		return Recipe.create({
			title: "Llapingacho",
			level: "Amateur Chef",
			ingredients: [
				"5 to 6 Yukon Gold potatoes, or russet potatoes",
				"1/4 cup vegetable oil, or olive oil, divided",
				"1 onion, finely chopped",
				"1 package Sazon Goya with achiote, or 1 teaspoon cumin and 1/2 teaspoon achiote powder",
				"1 cup shredded white cheese, such as queso fresco, mozzarella, or Monterey Jack",
				"1/4 Salt, to taste",
				"1/4 Freshly ground black pepper, to taste",
				"1/4 to 1/2 cup all-purpose flour",
				"1/4 cup Salsa de mani, peanut sauce for serving",
			],
			cuisine: "Traditional of Ecuador",
			dishType: "main_course",
			duration: 90,
			creator: "Chef Ambato",
		});
	})
	.then((newRecipe) => {
		console.log("The required Recipe Info is: ", newRecipe.title);
	})

	// Iteracion 3
	.then(() => Recipe.insertMany(data))
	.then((titleRecipes) => {
		titleRecipes.forEach((el) => {
			console.log(el.title);
		});
	})

	// Iteracion 4
	.then(() =>
		Recipe.findOneAndUpdate(
			{ title: "Rigatoni alla Genovese" },
			{ duration: 100 },
			{ new: true }
		)
	)
	.then((updatedRecipe) =>
		console.log(
			"The Recipe was succesful updated. Check it out!",
			updatedRecipe
		)
	)
	// Iteracion 5
	.then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
	.then((deletedRecipe) => console.log("Delete Status: ", deletedRecipe))
	.catch((error) => {
		console.error("Error connecting to the database", error);
	})
	.finally(() => {
		return mongoose.disconnect();
	});
