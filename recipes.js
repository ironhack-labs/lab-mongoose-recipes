const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
	title: { 
		type: String,
		required: true,
		unique: true,
	},
	level: {
		type: String,
		enum: [ "Easy Peasy", "Amateur Chef", "UltraPro Chef" ],
	},
	ingredients: [ String ],
	cuisine: {
		type: String,
		required: true,
	},
	dishtype: {
		type: String,
		enum: [ "Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other" ],
	},
	image: {
		type: String,
		default: "https://images.media-allrecipes.com/images/75131.jpg",
	},
	duration: {
		type: Number,
		min: 0,
	},
	creator: String,
	created: {
		type: Date,
		default: Date.now
	}
});

const Recipe = mongoose.model("Recipe", recipeSchema);



Recipe.create({
	title: "Food Porn",
	level: "Easy Peasy",
	ingredients: ["ing 1", "ing 2"],
	cuisine: "American",
	dishtype: "Breakfast",
	image: "https://cdn1.opnminded.com/wp-content/uploads/2017/11/food-porn-03.jpg",
	duration: 15,
	creator: "JN",	
})
	.then(recipeDoc => {
		console.log(recipeDoc.title);
	})
	.catch(err => {
		console.log("recipe.create() FAILURE", err);
	});

Recipe.insertMany(data)
	.then(list => {
		list.forEach(recipe => {
			console.log("recipe.insertMany() SUCCESS", list);
		});
	})
	.catch(err => {
		console.log("recipe.insertMany() FAILURE", err);
	});

Recipe.findOneAndUpdate(
	{ title: { $eq: "Rigatoni alla Genovese" } },
	{ $set: { duration: 100 } }
	)
	.then(recipe => {
		console.log("recipe update SUCCESS");
	})
	.catch(err => {
		console.log("recipe update FAILURE", err);
	});


Recipe.findOneAndRemove( { title: { $eq: "Carrot Cake" } } )
	.then(recipe => {
		console.log("recipe remove SUCCESS");
	})
	.catch(err => {
		console.log("recipe remove FAILURE", err);
	});


mongoose.connection.close()
	.then(() => {
		console.log("Properly disconnected from DB");
	})
	.catch(err => {
		console.log("Error disconnecting from DB", err);
	});