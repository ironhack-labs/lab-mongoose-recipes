const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Schema = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
	.then(() => {
		console.log('Connected to Mongo!')
	}).catch(err => {
		console.error('Error connecting to mongo', err)
	});

const recipeSchema = new Schema({
	title: String,
	level: {
		type: String,
		enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
	},
	ingredients: [String],
	cousine: {
		type: String
	},
	dishType: {
		type: String,
		enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
	},
	image: {
		type: String,
		default: 'https://images.media-allrecipes.com/images/75131.jpg'
	},
	duration: {
		type: Number,
		min: 0
	},
	creator: String,
	created: {
		type: Date,
		default: Date.now
	}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.collection.drop();

Recipe.insertMany(data)
	.then((data) => {
		return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { duration: 100}, { new: true })
			.then((recipe) => { return recipe.save(); })
			.then(() => { console.log('Updated duration'); })
			.catch((e) => { console.log('Error', e); });
	})
	.then(() => {
		return Recipe.deleteOne( {title: 'Carrot Cake'})
			.then(() => {
				console.log('Deleted Carrot Cake'); 
				mongoose.disconnect();
			})
			.catch((e) => {	console.log('Error', e); });
			
	})
	.catch((e) => { console.log('Error', e);});


process.on('SIGINT', () => {
	mongoose.connection.close( () => {
		console.log('Mongoose connection closed');
		process.exit(0);
	} )
})



app.listen(3000, () => {
	console.log('Listening 3000');
});

