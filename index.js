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
    // Iteration 2 - Create a recipe
    Recipe.create({
      title: "Broccoli & Stilton soup",
      level: "Amateur Chef",
      ingredients: [
        "2 tblsp Rapeseed Oil",
        "1 finely chopped onion",
        "1 celery", "1 sliced leek",
        "1 medium potatoes",
        "1 knob butter",
        "1 litre hot vegetable stock",
        "1 head chopped broccoli",
        "140g stilton cheese"
      ],
      cuisine: "British",
      dishType: "soup",
      image: "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg",
      duration: 45,
      creator: "unknown"
    }).then(newRecipe => console.log(`A new recipe is created: ${newRecipe.title}`))
      .catch(error => console.log(`Error while creating a new recipe: ${error}`));
    
    // Iteration 3 - Insert multiple recipes
    Recipe.insertMany(data).then(newRecipes => {
      newRecipes.forEach(recipe => console.log(`A new recipe is created: ${recipe.title}`))
    }).catch(error => console.log(`Error while creating a new recipe: ${error}`));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });