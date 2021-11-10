const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

mongoose.set('useFindAndModify', false);

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(self => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		return Recipe.deleteMany()
	})
	.then(() => Recipe.syncIndexes())
	.then(() => Recipe.create({title: 'Arroz', cuisine: 'international'}))
	.then(() => {
		Recipe.insertMany(data)
		data.forEach(recipe => {
			console.log(`Recipe "${recipe.title}" created`);
		});
	})
	.then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, {returnOriginal: false}))
	.then((rigatone) => console.log(rigatone))
	.then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
	.then((carrot) => console.log(carrot))
	.catch(error => {
		console.error('Error connecting to the database', error);
	});
