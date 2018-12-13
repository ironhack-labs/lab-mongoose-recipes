const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const recipe = require('./models/recipeSchema.js');

mongoose
	.connect('mongodb://localhost/recipeApp')
	.then(() => {
		console.log('Connected to Mongo!');
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

// recipe
// 	.create({
// 		title: 'Asian Glazed Chicken Thighs',
// 		level: 'Amateur Chef',
// 		ingredients: [
// 			'1/2 cup rice vinegar',
// 			'5 tablespoons honey',
// 			'1/3 cup soy sauce (such as Silver Swan®)',
// 			'1/4 cup Asian (toasted) sesame oil',
// 			'3 tablespoons Asian chili garlic sauce',
// 			'3 tablespoons minced garlic',
// 			'salt to taste',
// 			'8 skinless, boneless chicken thighs'
// 		],
// 		cuisine: 'Asian',
// 		dishType: [ 'Dish' ],
// 		image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
// 		duration: 40,
// 		creator: 'Chef LePapu'
// 	})
// 	.then(recipe => {
// 		console.log('The recipe is saved and its value is: ', recipe);
// 	})
// 	.catch(err => {
// 		console.log('An error happened:', err);
// 	});

recipe.remove().then(() => {
return recipe.insertMany(data).then((recipes) => {
		recipes.forEach((recipe) => {
			console.log('All recipe titles:', recipe.title)}
	});
});

.then((recipe) => {
  recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
.then(console.log('New duration of the recipe is:', recipe.duration))
.catch(console.log('not sucessful'));
});