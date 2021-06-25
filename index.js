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
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // this code is commented out so that we don't repeat the creation at every reload
  /* const oneRecipe = {
    title: 'new recipe',
    level: 'Easy Peasy', 
    ingredients: ['salt', 'pepper'], 
    cuisine: 1, 
    dishType: 'breakfast', 
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 60,
    creatory: 'Miki',
  };


  Recipe.create(oneRecipe)
  .then((createdRecipe) => console.log(createdRecipe))
  .catch((err => console.log(err)))
 */

  Recipe.insertMany(data)
	.then(createdRecipes => {
    createdRecipes.forEach((recipe) => {
      
      console.log(recipe.title)
    })
  })
	.catch((err) => console.log(err));