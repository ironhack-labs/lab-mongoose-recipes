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
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase();
	})
	.then(() => {
		// Run your code here, after you have insured that the connection was made
		const myRecipe = {
			title: "Subway Tikka",
			level: "Easy Peasy",
			ingredients: [
				"Oats & honey bread",
				"Chicken tikka",
				"Cheddar",
				"Lettuce",
				"Tomato",
				"Red Onion",
				"Corn",
				"Pickle",
				"Chipotle Southwest Sauce",
			],
			cuisine: "Fast Food",
			dishType: "main_course",
			image:
				"https://www.subway.com/ns/images/menu/FRA/FRE/menu-category-sandwich-tikka.jpg",
			duration: 5,
			creator: "Subway",
		};

		async function doAll() {
			try {
				await Recipe.create(myRecipe)
					.then((dbResponse) => console.log(dbResponse.title))
					.catch((dbError) => console.log(dbError));

				await Recipe.insertMany(data)
					.then((dbResponse) => {
						dbResponse.forEach((x) => {
							console.log(x.title);
						});
					})
					.catch((dbErr) => console.log(dbErr));

				await Recipe.findOneAndUpdate(
					{ title: "Rigatoni alla Genovese" },
					{ duration: 100 },
					{ new: true }
				)
					.then((dbResponse) =>
						console.log("Congratz ! You updated the recipe !")
					)
					.catch((dbErr) => console.log(dbErr));

				await Recipe.deleteOne({ title: "Carrot Cake" })
					.then((dbResponse) =>
						console.log("Yay ! We all hate carrot cake no ? Maybe not...")
					)
					.catch((dbErr) => console.log(dbErr));
			} catch (error) {
				console.log(error);
			}
		}
		doAll();
	})
	.catch((error) => {
		console.error("Error connecting to the database", error);
	})
	.finally(() => mongoose.close());
