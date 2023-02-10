const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI)
	.then((x) => {
		console.log(`Connected to the database: "${x.connection.name}"`);
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany();
	})
	.then(() => {
		// Run your code here, after you have insured that the connection was made

		const couscous = {
			title: 'Couscous',
			level: 'Easy Peasy',
			Ingredients: ['Semolina flour', 'chicken broth', 'kosher salt', 'couscous'],
			cuisine: 'North African',
			dishType: 'main_course',
			image: 'https://www.onceuponachef.com/images/2016/10/Perfect-Couscous-1200x795.jpg',
			duration: 15,
			creator: 'God',
		};

		Recipe.create(couscous).then(console.log(couscous.title));
		Recipe.insertMany(data)
			.then(
				data.forEach((element) => {
					console.log(element.title);
				})
			)
			.then(() =>
				Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(console.log('Success'))
			);
	})
	.catch((error) => {
		console.error('Error connecting to the database', error);
	});
