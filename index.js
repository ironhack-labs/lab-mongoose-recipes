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
	})
	.catch((error) => {
		console.error("Error connecting to the database", error);
	});

//Iteration 2
const recipe1 = {
	title: "Tortilla de papas",
	level: "Easy Peasy",
	ingredients: ["Papas", "Cebolla", "Huevo"],
	cuisine: "Española",
	dishType: "main_course",
	duration: 20,
	creator: "Triana",
};

/*Recipe.create(recipe1)
	.then((recipe) => {
		console.log(`Recipe created: ${recipe.title}`);
	})
	.catch((error) => console.error(error));

  //iteration 3

Recipe.insertMany(data)
  .then(data => {
    console.log(`Recipes created: ${data.length}`)
  })
    .catch(error => console.error(error)); */

  //iteration 4

  Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {$set:{duration:100}}, {new: true})
    .then((recipe) =>{ console.log(recipe)})
    .catch(error => console.error(error));
