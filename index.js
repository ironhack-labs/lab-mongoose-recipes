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
      .then(recipe => console.log('Personal recipe of', recipe.title, 'added')) 
      .catch(err => console.log('Error in Cookies recipe:', err))
    
    Recipe
      .insertMany(data)
      .then((recipes) => {
        recipes.forEach((recipe) => console.log(recipe.title, 'recipe added'))
      })
      .then(() => {
        const prom1 = Recipe
          .findOneAndUpdate(
            { title: "Rigatoni alla Genovese", creator: "Chef Luigi" },
            { duration: 100 }
          )
          .then((recipe) => console.log(`${recipe?.title} duration update succeeded`))
          .catch((err) => console.log("Error in duration of Rigatoni update:", err))

        const prom2 = Recipe
          .findOneAndRemove({
            name: "Carrot Cake",
            creator: "Chef Nadia",
          })
          .then((recipe) => console.log(`${recipe?.title} removed successfully`))
          .catch((err) => console.log("Error in remove:", err))
        // .finally(() => mongoose.connection.close()) // Close the Mongoose connection
        
        // Close mongoose connection
        Promise
          .all([prom1, prom2])
          .then(() => {
            console.log('All done')
            mongoose.connection.close()
          })
      })
      .catch((err) => console.log("Error in data import:", err))
  })
  .catch(error => console.error('Error connecting to the database', error))