const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  //ITERATION 2 
// In index.js, using the Model.create method, you should pass the info to create a new recipe. After the creation, you can use MongoDB Compass to check everything went ok. After inserting the recipe, console.log the title of the recipe.

const newRecipe = { title: 'Fruit Salad', cuisine: 'American'};

Recipe.create(newRecipe, (error, Recipe) => {
  if (error) {
    console.log('An error happened:', error);
    return;
  }
  console.log('The user is saved and its value is: ', Recipe);
});