// require mongo odm
const mongoose = require("mongoose");

//require book model
const Recipe = require("./../recipe-model.js");

// connect to db
mongoose.connect("mongodb://localhost/recipeApp");

// first recipe
Recipe.create({
		title: "Mango Lassi",
		level: "Amateur Chef",
		ingredients: ["Fresh mango", "coconut", "Milk"],
		cuisine: "Thai",
		dishType: "Drink",
		creator: "Sammy",
	}).then(result => {
		console.log("successfully created", result);
	})
	.catch(err => {
		console.log(" Nope creation was done wrong 💩  💩  💩 times", err);
	});

// second recipe
Recipe.create({
		title: "Real italian Carbonara",
		level: "Amateur Chef",
		ingredients: ["quality pasta", "egg", "italian style"],
		cuisine: "Italian",
		dishType: "Dish",
		creator: "Lorenzo",
	}).then(result => {
		console.log("successfully created", result);
	})
	.catch(err => {
		console.log(" Nope creation was done wrong 💩  💩  💩  times", err);
	});