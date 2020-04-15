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
		// ITERATION 2 - CREATE RECIPE
		Recipe.create({
			title: 'Pasta Bolognaise',
			level: 'Amateur Chef',
			ingredients: [ 'pasta', 'meat', 'cheese', 'salt', 'pepper', 'onions' ],
			cuisine: 'Italian',
			dishType: 'main_course',
			duration: 30,
			creator: 'Vladimir'
		})
			.then((dbResponse) => {
				console.log(`* Recipe : ${dbResponse.title} has been CREATED`);
				// Recipe.insertMany(data).then((dbResponse) => { }).catch((dbErr) => {});

				// ITERATION 3 - INSERT RECIPE FROM DATA BASE
				Recipe.insertMany(data)
					.then((dbResponse) => {
						data.forEach((element) => {
							console.log(`** Recipe : ${element.title} -- has been ADDED to the dataBase`);
						});

						// ITERATION 4 - FIND AND UPDATE
						Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
							.then((dbResponse) => {
								console.log(`*** Recipe : ${dbResponse.title} -- has been UPDATED to the dataBase`);

								// ITERATION 5 - FIND AND REMOVE
								Recipe.deleteOne({ title: 'Carrot Cake' })
									.then((dbResponse) => {
										//console.log(dbResponse);
										console.log(`**** No more Carrot Cake, sorry...`);
										mongoose.connection
											.close()
											.then((dbResponse) => {
												console.log('The dataBase is now closed');
											})
											.catch((dbErr) => {
												console.log(dbErr);
											});
									})
									.catch((dbErr) => {
										console.log(dbErr);
									});
							})
							.catch((dbErr) => {
								console.log(dbErr);
							});
					})
					.catch((dbErr) => {
						console.log(dbErr);
					});
			})
			.catch((dbErr) => {
				console.log(dbErr);
			});
	})
	.catch((error) => {
		console.error('Error connecting to the database', error);
	});
