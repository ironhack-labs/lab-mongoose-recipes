const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(require('easy-livereload')());

//const Schema = mongoose.Schema;
const chalk = require("chalk");

const data = require("./data.js");
const Recipe = require("./models/recipe-model.js");

mongoose
	.connect("mongodb://localhost/recipeApp")
	.then(() => {
		console.log(chalk.green("Connected to Mongo! ❤️"));
	})
	.catch(err => {
		console.log(chalk.red.bold("Error connecting to Mongo....... 💩", err));
	});

// set server
app.listen(3000, () => {
	console.log("expressive llamas in pyjamas baby");
});

// view engine and static assets
app.use(express.static(__dirname + "/public"));
const hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

// seeding from data
Recipe.insertMany(data, function (error, docs) {
	if (error) {
		console.log(
			chalk.red.bold(
				"Could not bulk import data from existing collection 💩",
				error
			)
		);
	} else {
		console.log(chalk.green.bold("Bulk import went smooth", docs));
	}
});

// udptating one of them
Recipe.findOneAndUpdate({
		title: "Rigatoni alla Genovese"
	}, {
		$set: {
			duration: 100
		}
	},
	(err, doc) => {
		if (err) {
			console.log("Something wrong when updating data!");
		}

		console.log(chalk.magenta.bold("Recipe successfully updated to:"));
		console.log(chalk.white.dim(doc));
	}
);

Recipe.deleteOne({
		title: {
			$eq: "Carrot Cake"
		}
	})
	.then(result => {
		console.log(chalk.magenta.bold('Recipe'), result, chalk.magenta.bold('has been removed chef'));
	})
	.catch(err => {
		console.log("deleting went wrong", err);
		console.log(chalk.red.bold('Deleting query went wrong'), err);

	});

/*
 * ASYNC priority
 * connect,
 * remove
 * update
 * create (bulk import)
 */

// https://medium.com/@vsvaibhav2016/best-practice-of-mongoose-connection-with-mongodb-c470608483f0
//https://github.com/Automattic/mongoose/issues/330
// monkey patch, create a event after bulk import

// setTimeout(function () {
// 	mongoose.connection.close(function () {
// 		console.log("Mongoose default connection is disconnected due to application termination");
// 		process.exit(0);
// 	});
// }, 5000);

// routes
app.get("/", (request, response, next) => {
	Recipe.find({

		})
		.then(recipeResult => {
			response.locals.recipeArray = recipeResult; // pass the bookResult to locale bookArray prop to be used in views.
			response.render("./recipe/index.hbs");
		})
		.catch(err => {
			console.log("Fail you 💩");
			response.render("/recipe/error.hbs");
		});
});