const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany();
	})
	.then(async () => {
		await Recipe.create({
			title: 'Tiramisu',
			level: 'Easy Peasy',
			ingredients: [ 'Mascarpone', 'Chocolate', 'Cream', 'Eggs' ],
			cuisine: 'Italian',
			dishType: 'dessert',
			image: 'https://www.askchefdennis.com/wp-content/uploads/2011/04/Tiramisu10b.jpg',
			duration: 10,
			creator: 'Carminantonio Iannaccone',
			created: new Date('12/24/1969')
		});

		await Recipe.insertMany(data);

		let res = await Recipe.find({ title: 'Tiramisu' });
		console.log(res[0].title);

		//Iteration 4 - Update recipe

		let response = await Recipe.findOneAndUpdate(
			{title: "Rigatoni alla Genovese"},
			{duration: 100},
			{new:true}
			
			)
			console.log(response)
		
			// Iteration 5 - Remove a recipe

		let deleted = await Recipe.deleteOne(
			{title: "Carrot Cake"}
		)
		console.log(deleted)

		// Iteration 6 - Close the Database

		mongoose.disconnect()

	})
	.catch((error) => {
		console.error('Error connecting to the database', error);
	});
