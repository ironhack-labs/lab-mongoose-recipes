const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    Recipe
      .create({
        title: 'Chocolate Cookies',
        level: 'Amateur Chef',
        ingredients: [
          'Chocolate',
          'Butter',
          'Brown sugar', 
          'Flour',
          'Eggs',
          'Milk'
        ],
        cuisine: 'Germany',
        dishType: 'dessert',
        duration: 35,
        creator: 'John Favreau'
      })
      .then(recipe => console.log('Title:', recipe.title)) 
      .catch(err => console.log('Error in Cookies recipe:', err))
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((recipes) => {
        recipes.forEach((recipe) => console.log("Title:", recipe.title))
      })
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          // @ts-ignore
          .then((recipe) => console.log(`${recipe.title} duration update succeeded`))
          .catch((err) =>
            console.log("Error in duration of Rigatoni update:", err)
          )
      })
      .catch((err) => console.log("Error in data import:", err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
