const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,

	})
	.then(self => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase();
	})
	.then(() => {
		return Recipe.syncIndexes();
	})
	.then(() => {
		return Recipe.create({ title: "Prueba", cuisine: "Prueba" });
	})
	.then(newRecipe => {
		console.log("La nueva receta se llama ", newRecipe.title)
		return Recipe.insertMany(data);
	})
	.then(recipes => {
		recipes.forEach(recipe => {
			console.log("Añadida la receta ", recipe.title);
		});
		return Recipe.findOneAndUpdate(
			{ title: "Rigatoni alla Genovese" },
			{ duration: 100 },
			{ new: true }
		);
	})
	.then(recipe => {
		console.log("La duración de", recipe.title, "ahora es de", recipe.duration);
		return Recipe.deleteOne({ title: "Carrot Cake" });
	})
	.then(() => {
		console.log("La receta se ha borrado correctamente");
		mongoose.connection.close();
	})
	.catch(error => {
		console.error('Error connecting to the database', error);
	});