const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect(
    'mongodb://localhost/recipeApp', {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe
  .create({
    title: "Titulo",
    level: "Easy Peasy",
    ingredients: [],
    cuisine: "cocina",
    dishType: "Breakfast",
    duration: 30,
    creator: "raul"
  })
  .then(recipe => {
    console.log(recipe.title);
  });

Recipe
  .insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => console.log(recipe.title));
  });

Recipe
  .updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  })
  .then(console.log("Success! Rigatoni alla Genovese updated."));

Recipe
  .deleteOne({
    title: "Carrot Cake"
  })
  .then(console.log("Success! Carrot Cake deleted."));

mongoose.connection.close();