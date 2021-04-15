const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recipe1 = {
	title: "Tortilla de papas",
	level: "Easy Peasy",
	ingredients: ["Papas", "Cebolla", "Huevo"],
	cuisine: "Española",
	dishType: "main_course",
	duration: 20,
	creator: "Triana",
};

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase();
	})
	.then(() => {
		Recipe.find({}).then((recipes) => {
			if (recipes.length === 0) {
				//Iteration 2
				Recipe.create(recipe1)
					.then((recipe) => {
						console.log(`Recipe created: ${recipe.title}`);
					})
					.catch((error) => console.error(error));

				//Iteration 3
				return Recipe.insertMany(data)
					.then(() => {
						console.log(`Recipes created: ${data.length}`);
						//Iteration 4
						Recipe.findOneAndUpdate(
							{ title: "Rigatoni alla Genovese" },
							{ $set: { duration: 100 } },
							{ new: true }
						)
							.then((recipe) => console.log(recipe))
							.catch((error) => console.error(error));

						//Iteration 5
						Recipe.deleteOne({ title: "Carrot Cake" })
							.then((recipe) => console.log(recipe))
							.catch((error) => console.error(error));
					})
					.catch((error) => {
						console.error("Error connecting to the database", error);
					});
			}
		});
	});
