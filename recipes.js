const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
	console.log("Connected to Mongo!");

	mongoose.connection.db.dropDatabase();

	insertOneRecipe()
	.then(recipe => {
		console.log("The recipe is saved and its value is: ", recipe);
		insertManyRecipes()
		.then(recipes => {
			console.log("Added all recipies from data.js");
			updateRecipe()
			.then(recipe => {
				console.log("Recipe edited ", recipe);
				deleteRecipe()
				.then(recipe => {
					console.log("Recipe deleted ", recipe);
				})
			})
		})
	}) 
  })
  .catch(err => {
	console.error("Error connecting to mongo", err);
  });

const recipeSchema = new Schema({
  title: { type: String, unique: true, required: true },
  level: {
	type: String,
	enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cousine: { type: String, required: true },
  dishType: {
	type: String,
	enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
	type: String,
	default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

const insertOneRecipe = () => {
  var r = {
	title: "chocolate cake",
	level: "Amateur Chef",
	ingredients: ["Eggs", "Chocolate", "flour"],
	cousine: "Oven",
	dishType: "Dessert",
	duration: 40,
	creator: "Ferran Adria"
  };
  return Recipe.create(r)
}

const insertManyRecipes = () => {
  var recipes = require("./data");
  return Recipe.insertMany(recipes)
}

const updateRecipe = () => {
	return Recipe.updateOne({ title: "Rigatoni alla Genovese" },{ duration: 100 })
}

const deleteRecipe = () => {
	return Recipe.deleteOne({ title: "Carrot Cake" })
}

