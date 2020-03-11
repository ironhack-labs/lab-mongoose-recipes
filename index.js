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


  //

  const newRecipe = { title: 'Ensalada Malagueña', cuisine: 'Malagueña'};

Recipe.create(newRecipe, (error, Recipe) => {
  if (error) {
    console.log("An error:", error);
    return;
  }
  console.log("Recipe is created:", Recipe);
});