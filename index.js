const mongoose = require("mongoose")

mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)
mongoose.set("useUnifiedTopology", true)

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model")
// Import of the data from './data.json'
const data = require("./data")
const { deleteMany } = require("./models/Recipe.model")

const MONGODB_URI = "mongodb://localhost:27017/recipe-app"

const createRecipe = (recipe) => Recipe.create(recipe)
const createRecipes = (recipes) => Recipe.insertMany(recipes)

const updateRecipe = async (item, update) => {
	const result = await Recipe.findOneAndUpdate(item, update)
	if (result) {
		return console.log(`Recipe was updated! `)
	}
	console.log(result)
	return console.log(`Failed to update recipe! `)
}

const deleteRecipe = async (item, update) => {
	const result = await Recipe.deleteOne(item, update)
	if (result) {
		return console.log("Recipe is deleted")
	}
	console.log(result)
	return console.log("Failed to delete Recipe")
}

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`)
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase()
	})

	.then(async () => {
		// Run your code here, after you have insured that the connection was made
		data.map(async (doc) => {
			const result = await createRecipe(doc)
			console.log(result.title)
		})

		const recipes = await createRecipes(data)

		recipes.map((item) => {
			console.log(item.title)
		})

		await updateRecipe({ title: "Rigatoni alla Genovese" }, { duration: 100 })

		await deleteRecipe({ title: "Carrot Cake" })

		console.log("Connected and there you will put the data")

		await mongoose.disconnect()
	})
	.catch((error) => {
		console.error("Error connecting to the database", error)
	})
