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
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase();
	})
	.then(() => {
		//Iteration 2
		// Recipe.create({
		// 	title: 'Arroz con bacon',
		// 	level: 'Easy Peasy',
		// 	ingredients: [
		// 		'arroz',
		// 		'cebolla',
		// 		'bacon',
		// 		'ajo',
		// 		'pimienta negra',
		// 		'perejil',
		// 	],
		// 	cuisine: 'Vitrocerámica o gas',
		// 	dishType: 'main_course',
		// 	duration: 30,
		// 	creator: 'Maria  Jesús Urrutia Jiménez',
		// })
		// 	.then((rec) => console.log(rec.title))
		// 	.catch((err) =>
		// 		console.log('Error ocurrido durante la inserción: ', err)
		// 	);
		//Iteration 3

		Recipe.insertMany(data)
			.then((recs) =>
				recs.forEach((rec) => console.log('Recipe Title: ', rec.title))
			)
			.catch((err) =>
				console.log('Error ocurrido durante la inserción: ', err)
			);
	})
	.catch((error) => {
		console.error('Error connecting to the database', error);
	});
