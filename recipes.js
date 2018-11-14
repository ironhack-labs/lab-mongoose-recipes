const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const Recipe = require(`./models/RecipeSchema`)


mongoose.connect('mongodb://localhost/recipeApp')
	.then(() => {
		console.log('Connected to Mongo!');
	}).catch(err => {
		console.error('Error connecting to mongo', err);
	});

Recipe.insertMany(data)
	.then(recipe => recipe.forEach((elem) => console.log(`The recipe is created and it is: `, elem.title)))
	.catch(err => console.log(`An error happened: `, err))

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
	.then(recipe => console.log(`Duration of Rigatoni updated`))
	.catch(err => console.log(`An error has ocurred:`, err))

Recipe.deleteOne({ title: 'Carrot Cake'})
	.then(recipe => console.log(`Carrot Cake removed`))
	.catch(err => console.log(`An error has ocurred`, err))