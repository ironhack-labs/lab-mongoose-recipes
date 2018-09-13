const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Schema = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
	.then(() => {
		console.log('Connected to Mongo!')
	}).catch(err => {
		console.error('Error connecting to mongo', err)
	});

app.listen(3000, () => {
	console.log('Listening 3000');
})