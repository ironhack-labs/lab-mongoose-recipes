const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const newRecipe = {
  title: 'Chocolate Chip Cookies',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet and/or milk chocolate chips'],
  cuisine: 'American',
  dishType: 'snack',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 30,
  creator: 'Chef Jennifer'
};

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
    return Recipe.create(newRecipe)
  })
  .then(recipe => {
    console.log(`Recipe created: ${recipe.title}`);
    // Close the DB connection when done
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
