const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipe-app";

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
		mongoose.set("useFindAndModify", false);
		const newRecipe = {
			title: "Lasanha",
			level: "Easy Peasy",
			ingredients: ["pasta", "carne", "queijo"],
			cuisine: "italiano",
			dishType: "main_course",
			duration: 25,
			creator: "Rui Pereira",
		};

		Recipe.create(newRecipe)
			.then((recipe) => {
				console.log(`The user created a recipe ${recipe.title}`)
			})
			.catch((error) => {
				console.log(`An error occured: ${error}`);
			});

		Recipe.insertMany(data)
			.then((recipes) => {
				recipes.forEach((dish) => {
					console.log(`Inserted this recipes ${dish.title}`);
				});
				Recipe.findOneAndUpdate(
					{ title: "Rigatoni alla Genovese" },
					{ duration: 100 }
				)
					.then((update) => {
						console.log(`Duration updated on recipe ${update}`);
					})
					.catch((error) => {
						console.log(`An error occured ${error}`);
					});
				Recipe.deleteOne({ title: "Carrot Cake" })
					.then((deleted) => {
						console.log(`Recipe deleted`);
					})
					.catch((error) => {
						console.log(`An error occured ${error}`);
					});
			})
			.catch((error) => {
				console.log(`An error occured ${error}`);
			})
			.catch((error) => {
				console.error("Error connecting to the database", error);
			});

		// mongoose.connection.close(() => {
		// 	console.log("Mongoose disconnected");
	})
	.then(() => {
		mongoose.connection.close(() => {
			console.log("Mongoose disconnected");
		});
	});
