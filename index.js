const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let newRecipe = {
    title: 'Tacos de cochi',
    level: 'Easy Peasy',
    ingredients: ['Suadero', 'Chicharrón', 'Cebolla', 'Longaniza', 'Cochi'],
    cuisine: 'Mexicana',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 10,
    creator: 'Don Beto'};

Recipe.create(newRecipe)
	.then(recipeFromDB =>{
	    console.log(`Created recipe: ${recipeFromDB.title}`);
	}) 
	.catch(err =>{
	    console.error(`Error while creating recipe: ${err} `);
	});


Recipe.insertMany(data)
	.then(recipesFromDB =>{
	recipesFromDB.map((c) => {console.log('Title:', c.title);});

	}) 
	.catch(err =>{
	 console.error(`Error while creating recipes: ${err} `);
	});


Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
	.then(recipesUpdatedInDB =>{
	console.log(`Successfully updated duration from recipe: ${JSON.stringify(recipesUpdatedInDB)  } `);
	})
	.catch(err =>{
	console.error(`Error while updating duration: ${err} `);
	});


Recipe.deleteOne({title: 'Carrot Cake'})
	.then(recipesDeletedInDB =>{
	console.log(`Successfully deleted from recipe: ${JSON.stringify(recipesUpdatedInDB)  } `);
	})
	.catch(err =>{
	console.error(`Error while deleting: ${err} `);
	});

