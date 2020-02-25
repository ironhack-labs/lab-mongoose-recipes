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

Recipe.insertMany(data)
  .then(recipes => {
    console.log(`Recipes saved !`)
    console.log(recipes.title)})

    //recipes.forEach(recipes => console.log(` --> title: ${recipes.name}`))

  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );

