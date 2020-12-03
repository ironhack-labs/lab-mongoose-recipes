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
		const recipe = {
			title: "Pão de Queijo",
			level: "Easy Peasy",
			ingredients: ["pão", "queijo", "leite"],
			cuisine: "mineira",
			dishType: "breakfast",
			image:
				"https://vovopalmirinha.com.br/wp-content/uploads/2019/06/pao-de-queijo-702x336.jpg",
			duration: 120,
			creator: "Casa do Pão de Queijo",
		};
		Recipe.create(recipe)
			.then((recipe) => console.log(recipe.title))
			.catch((error) => console.log(error));

		Recipe.insertMany(data)
			.then((res) => {
				res.map((el) => console.log(el.title));
				Recipe.findOneAndUpdate(
					{ title: "Rigatoni alla Genovese" },
					{ duration: 100 }
				)
					.then((res) => console.log("Updated!"))
					.catch((err) => console.log(err));
				Recipe.deleteOne({ title: "Carrot Cake" })
					.then((res) => console.log("Deleted"))
					.catch((err) => console.log(err));

				mongoose.connection.close();
			})
			.catch((error) => console.log(error));
	})
	.catch((error) => {
		console.error("Error connecting to the database", error);
	});
