const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
	.connect('mongodb://localhost/recipe-app-dev', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
        useFindAndModify: false,
	})
	.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
	.catch(err => console.error('Error connecting to mongo', err));

//


const myCode = async () => {
	const recipe = await Recipe.create({title: 'Rice', cuisine: 'Mediterranean'});
	console.log(recipe.title);

	const recipes = await Recipe.insertMany(data);
	recipes.forEach((e) => console.log(e.title));

	const updated = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true});
	console.log(updated.title + ' has been updated successfully');

	await Recipe.deleteOne({title: 'Carrot Cake'});
	console.log('Carrot Cake has been removed successfully');

	await mongoose.disconnect();
};

try {
    myCode();
} catch (e) {
    console.error(e);
}

