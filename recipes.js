const data = require('./data.js');
const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('./model/Recipe');

const app = express();

mongoose
	.connect('mongodb://localhost/recipeApp')
	.then(() => {
		console.log('Connected to Mongo!');
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

app.get('/add-one', (req, res) => {
	const recipe = new Recipe({ title: 'soup', cousine: 'german' });
	recipe
		.save()
		.then((result) => {
			console.log(result);
			res.send(result);
		})
		.catch((err) => console.log(err));
});
app.get('/get-many', (req, res) => {
	Recipe.insertMany(data)
		.then((recipe) => {
			res.send(recipe);
		})
		.catch((err) => console.log(err));
});

app.get('/update-one-recipe', (req, res) => {
	Recipe.findByIdAndUpdate(
		'5b7ea151338a5368dd975514',
		{ duration: 100 },
		{ new: true }
	).then((recipe) => {
		res.send(recipe);
	});
});
app.get('/remove-one-recipe', (req, res) => {
	Recipe.findByIdAndRemove({ _id: '5b7ea503334a6a5d6aaa2b48' }).then((recipe) => {
		res.send(recipe);
		console.log('Removed carrot cake!');
	});
});

app.listen(4000);

process.on('SIGINT', () => {
	mongoose.connection.close().then(() => {
		console.log('closing db');
		res.send('closed db');
		process.exit(0);
	});
});
