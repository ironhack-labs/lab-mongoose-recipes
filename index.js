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
		useFindAndModify: false,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase();
	})
	.then(() => {
		// Run your code here, after you have insured that the connection was made
		const newRecipe = {
			title: "Cheesecake",
			level: "Amateur Chef",
			cuisine: "Greek",
			dishType: "dessert",
			image:
				"https://www.thecheesecakefactory.com/assets/images/Menu-Import/960x720-CCF_FreshStrawberryCheesecake.jpg",
			duration: 30,
		};
		Recipe.create(newRecipe)
			.then(() => {
				console.log(`${newRecipe.title}`);
			})
			.catch((error) => {
				console.log(`Something went wrong adding the new recipe: ${error}`);
			})
			.then(() => {
				Recipe.insertMany(data)
					.then((recipesFromDB) => {
						recipesFromDB.forEach((recipe) => {
							console.log(`${recipe.title}`);
						});
					})
					.catch((error) => {
						console.log(`Something went wrong: ${error}`);
					})
					.then(() => {
						Recipe.findOneAndUpdate(
							{ title: "Rigatoni alla Genovese" },
							{ duration: 100 },
							{ new: true }
						)
							.then(() => {
								console.log(`Record updated successfully.`);
							})
							.catch((error) => {
								console.log(`Something went wrong: ${error}`);
							})
							.then(() => {
								Recipe.deleteOne({ title: "Carrot Cake" })
									.then(() => {
										console.log(`Record deleted successfully.`);
									})
									.catch((error) => {
										console.log(`Something went wrong: ${error}`);
									})
									.then(() => {
										mongoose.disconnect();
									})
									.catch((error) => {
										console.error("Error connecting to the database", error);
									});
							});
					});
			});
	});
