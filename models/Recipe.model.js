const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
	title: String,
	level: String,
	ingredients: [ String ],
	cuisine: String,
	dishType: String,
	image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
	duration: { type: Number, min: 0 },
	creator: String,
	created: { type: Date, deafult: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
