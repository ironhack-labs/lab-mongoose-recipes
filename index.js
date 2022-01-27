const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Iteration 2 - Create a recipe:
const myRecipe = {
  "title": "Stuffed Cabbage",
  "level": "Amateur Chef",
  "ingredients": ["rice", "cabbage", "pork meat", "salt", "pepper"],
  "cuisine": "Hungarian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 40,
  "creator": "Chef Mohammed"
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // Iteration 2 - Create a recipe:
  .then(() => {
    return Recipe.create(myRecipe);
  })
  
  .then((myRecipe) => {
    console.log(myRecipe.title);
    return Recipe.insertMany(data);
  })

  // Iteration 3 - Create database from data.json:
  .then((recipes) => {
    recipes.forEach((recipe) => console.log(recipe.title))
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true });
  })

  // Iteration 4 - Update a recipe
  .then((updatedRecipe) => {
    console.log(updatedRecipe.title + " has been updated.");
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  // Iteration 5 - Delete the Carrot Cake:
  .then((deletedRecipe) => {
    console.log(`${deletedRecipe.deletedCount} has been deleted.`);

    // Iteration 6 - Close the connection:
    mongoose.connection.close();
  })

    .catch(error => {
    console.error('Error connecting to the database', error);
  });
