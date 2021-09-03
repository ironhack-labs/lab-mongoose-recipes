const mongoose = require("mongoose")

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model")
// Import of the data from './data.json'
const data = require("./data")

const MONGODB_URI = "mongodb://localhost:27017/recipe-app"

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		// useCreateIndex: true,
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`)
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany()
	})

	.then(() => {
		//Iteration 2
		const myRecipe = {
			title: "Pizza",
			level: "Easy Peasy",
			ingredients: ["bread", "salsa", "cheese"],
			cuisine: "Italian",
			dishType: "main_course",
			duration: 15,
			creator: "Dario Hirsch",
		}

		return Recipe.create(myRecipe)
	})

	.then((myRecipe) => console.log(myRecipe.title))

	.then(() => {
		return Recipe.insertMany(data)
	})

	.then((recipes) => recipes.forEach((recipe) => console.log("New recipe: " + recipe.title)))

	.then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }))

	.then(() => console.log("Updated!"))

	.then(() => {
		return Recipe.deleteOne({ title: "Carrot Cake" })
	})
	.then(() => console.log("deleted!"))

	.catch((error) => {
		console.error("Error connecting to the database", error)
	})

	.finally(() => mongoose.connection.close())

//   User.create(data)
// .then(user => console.log('The user is saved and its value is: ', user))
// .catch(error => console.log('An error happened while saving a new user:', error));

// 	//Iteration 3
// 	.then(() => {
// 		return Recipe.insertMany(data);
// 	})
// 	//Iteration 4
// 	.then(() => {
// 		Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(() => {
// 			console.log("caca");
// 		});
// 	})

// 	// .then(() => {
// 	// 	console.log("recipe updated");
// 	// })

// 	.then(() => {
// 		Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
// 			console.log("deleted!");
// 		});
// 	})

// // mongoose.connection.close();
