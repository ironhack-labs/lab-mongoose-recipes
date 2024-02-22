const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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
    return Recipe.create({
      "title": "Cheeseburger",
      "level": "UltraPro Chef",
      "ingredients": ["cheese, burger, brioche"],
      "cuisine": "American",
      "dishType": "main_course",
      "duration": 15,
      "creator": "Chef Alex",
    });
  })
  .then((newRecipe) => console.log(`New recipe: ${newRecipe.title}`))
  .then(() => Recipe.insertMany(data))
  .then((recipes) => {
    recipes.forEach((recipe) => console.log(`New recipe: ${recipe.title}`));
  })
  .then(() => {
    const query = { title: "Rigatoni alla Genovese" };
    return Recipe.findOneAndUpdate(query, { duration: 100 }, {new: true} );
  })
  .then((recipeUpdated) => console.log(`${recipeUpdated.title} new duration: ${recipeUpdated.duration}`))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then((result) => console.log(`${result.deletedCount} recipe deleted`))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close());
