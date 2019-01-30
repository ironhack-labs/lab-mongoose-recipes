const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipeModel.js');

mongoose
	.connect('mongodb://localhost/recipeApp')
	.then(() => {
		console.log('Connected to Mongo!');
		return Recipe.create({
			title: 'Tortilla de Papas',
			level: 'Amateur Chef',
			ingredient: [ 'Huevo', 'Papas', 'Cebolla' ],
			cuisine: 'Española',
			dishType: 'Dish',
			image: 'https://www.recetasderechupete.com/wp-content/uploads/2016/08/Tortilla-de-patatas-525x360.jpg',
			duration: 40,
			creator: 'Ruben y Carlos'
		});
	})
	.then((recipe) => {
		console.log('La receta se ha guardado, y su título es: ', recipe.title);
		return Recipe.insertMany(data);
	})
	.then((allRecipes) => {
		allRecipes.forEach((recipe) => console.log(recipe.title));
		return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
	})
	.then((recipe) => {
		console.log('La receta se ha actualizado su duración a', recipe);
		return Recipe.deleteOne({ title: 'Carrot Cake' });
	})
	.then((recipe) => {
		console.log('La receta se ha eliminado ', recipe.title);
		return process.on('SIGINT', () => {
			mongoose.connection.close(() => {
				console.log('Mongoose default connection disconnected through app termination');
				process.exit(0);
			});
		});
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

// lo he ejecutado primero, se ha creado en mongo, y ahora
// lo comento para que no vuelva a grabarse
