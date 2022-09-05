const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// Iteration 2
/*Recipe
.create({
  title: 'Vegan Tacos',
  level: 'Easy Peasy',
  ingredients: ['corn tortillas', 'onions', 'guacamole', 'jalapeno'],
  cuisine: 'Mexican',
  dishType: 'snack',
  image: 'https://lovingitvegan.com/wp-content/uploads/2019/02/Vegan-Tacos-15.jpg',
  duration: 25,
  creator: 'Camila Yokoo',
  created: 08-18-2022
}) 
.then(createRecipe => console.log(createRecipe.title))
.catch(err => console.log(err)) */

// Iteration 3
/*Recipe
.insertMany(data)
.then((data) => {
  data.map((copiedRecipes) => {
    console.log(copiedRecipes.title)
  })
})
.catch((err) => console.log(err));*/


// Iteration 4
Recipe.findOneAndUpdate(
	{title: 'Rigatoni alla Genovese'},
	{duration: 100},
	{new: true}
)
	.then((updated) => console.log('Recipe updated!'))
	.catch((err) => console.log(err));

// Iteration 5
Recipe.deleteOne({title: 'Carrot Cake'})
.then(() => console.log('succesfully deleted'));
