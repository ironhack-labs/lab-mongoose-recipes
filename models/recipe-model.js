// require mongoose again (set scope)
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining book schema
const recipeSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	level: {
		type: String,
		enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
	},
	ingredients: {
		type: [String],
		required: true
	},
	cuisine: {
		type: String,
		required: true
	},
	dishType: {
		type: String,
		enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
	},
	image: {
		type: String,
		match: /^https?:\/\//,
		default: "https://images.media-allrecipes.com/images/75131.jpg"
	},
	duration: {
		type: Number,
		default: 0
	},
	creator: {
		type: String,
		minlength: 3
	},
	created: {
		type: Date,
		default: Date.now
	},
});



/*

The recipes.js file already connects to the recipesApp database. Now we need to create a Recipe Schema. The schema should have the following fields:

created. Type Date. By default today.
*/

// register the mongoose model with corresponding schema
const Recipe = mongoose.model("Recipe", recipeSchema);

// share model to the rest of the app
module.exports = Recipe;