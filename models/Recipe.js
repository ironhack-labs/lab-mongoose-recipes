const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
	title: {
		type: String,
		// required: true,
		// unique: true
	},
	level: {
		type: String,
		enum: ['Easy Peasy','Amateur Chef', 'UltraPro Chef']
	},
	ingredients: Array,
	cuisine: {
		type: String,
		// required: true,
	},
	dishType: {
		type: String,
		enum: ['Breakfast','Snack', 'Dish', 'Drink', 'Dessert', 'Other']
	},
	image: {
		type: String,
		default: 'https://images.media-allrecipes.com/images/75131.jpg'
	},
	duration: Number,
	creator: String,
	created: {
		type: Date,
		// `Date.now()` returns the current unix timestamp as a number
		default: Date.now
	}
});

module.exports = mongoose.model('Recipe', recipeSchema);