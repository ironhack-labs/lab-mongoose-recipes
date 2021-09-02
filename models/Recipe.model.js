const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const today = Date.now()
let todayDate = new Date(today)

const recipeSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true,
		default: "Unknown Title",
	},
	level: {
		type: String,
		enum: ['Easy Peasy', 'Amateur Chef', 'Chef', 'UltraPro Chef'],
	},
	ingredients: {
		type: [ String ],
	},
	cuisine: {
		type: String,
		required: true,
		default: 'Unknown cuisine',
	},
	dishType: {
		type: String,
		enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'other', 'dessert']
	},
	image: {
		type: String,
		default: 'https://images.media-allrecipes.com/images/75131.jpg'
	},
	duration: {
		type: Number,
		min: 0
	},
	creator: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;