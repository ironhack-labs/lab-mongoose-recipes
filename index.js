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
		const cheesecake = {
			title: "cheesecake",
			level: "Easy Peasy",
			ingredients: [
				"sugar",
				"eggs",
				"cream cheese",
				"mixed berries",
				"butter",
				"vanilla essense",
			],
			cuisine: "american",
			dishType: "dessert",
			duration: 25,
			creator: "Hector",
		};

		Recipe.insertMany(data)
			.then((data) => {
				data.map((recipe) => console.log(recipe.title));
				Recipe.findOneAndUpdate(
					{ title: "Rigatoni alla Genovese" },
					{ duration: 100 },
					{
						new: true,
					}
				)
					.then((result) => console.log("Update successful"))
					.catch((error) => console.log(error));

				Recipe.deleteOne({ title: "Carrot Cake" })
					.then((result) => {
						console.log("Item removed!!!!");
						mongoose.connection.close();
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => console.log(error));
	})
	.catch((error) => {
		console.error("Error connecting to the database", error);
	});
