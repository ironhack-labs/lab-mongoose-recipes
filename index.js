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
		useUnifiedTopology: true
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase();
	})
	.then(() => {
		Recipe.create({
			title: 'Apple Pie',
			level: 'Amateur Chef',
			ingredient: [
				'1/2 cup unsalted butter',
				'3 tablespoons all-purpose flour',
				'1/4 cup water',
				'3 tablespoons all-purpose flour',
				'1/4 cup water',
				'1/2 cup white sugar',
				'1/2 cup packed brown sugar',
				'8 Granny Smith apples - peeled, cored and sliced'
			],
			cuisine: 'Grandmas cuisine',
			dishType: 'dessert',
			image: 'https://images.media-allrecipes.com/images/75131.jpg',
			duration: 45,
			creator: 'Yuval',
			created: 15 - 04 - 2020
		})
			.then((dbres) => {
				console.log(dbres);
				Recipe.insertMany(data)
					.then((dbres) => {
						console.log(dbres);
						Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
							.then((dbres) => {
								console.log(dbres);
								Recipe.deleteOne({ title: 'Carrot Cake' })
									.then((dbres) => {
										console.log(dbres);
										mongoose.connection
											.close()
											.then((dbres) => {
												console.log('Database closed!');
											})
											.catch((dberror) => {
												console.log(dberror);
											});
									})
									.catch((dberror) => {
										console.log(dberror);
									});
							})
							.catch((dberror) => {
								console.log(dberror);
							});
					})
					.catch((dberror) => {
						console.log(dberror);
					});
			})
			.catch((dberror) => {
				console.log(dberror);
			});
		// Run your code here, after you have insured that the connection was made
	})
	.catch((error) => {
		console.error('Error connecting to the database', error);
	});
