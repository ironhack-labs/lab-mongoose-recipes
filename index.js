const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { modelName } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // ### Iteration 2 - Create a recipe

    Recipe
      .create({
        title: "Chicken Teriyaki",
        level: "Easy Peasy",
        ingredients: [
          "600 grams skinless boneless chicken",
          "1 tablespoon cooking oil",
          "1/4 cup low-sodium soy sauce",
          "3 tablespoons light brown sugar",
          "3 tablespoons cooking Sake",
          "2 tablespoons Mirin",
          "2 teaspoons minced garlic",
          "1 shallot/green onion stem",
          "4 cups broccoli florets"],
        cuisine: "Asian",
        dishType: "main_course",
        image: "https://cafedelites.com/wp-content/uploads/2018/02/Teriyaki-Chicken-and-Rice-Bowl-IMAGE-7-1024x1536.jpg",
        duration: 40,
        creator: "Papi Chef",



      })

      .then(newRecipes => console.log('The new recipe is:', newRecipes.title))
      .catch(err => console.log('ERROR!:', err))
    return Recipe.create()

  })
  // ### Iteration 3 - Insert multiple recipes

  .then(() => {
    return Recipe.insertMany(data)
  })

  // ### Iteration 4 - Update recipe

  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })

  })

  // ### Iteration 5 - Remove a recipe

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })

  })


  // // ### Iteration 6 - Close the Database
  .then(() => {
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
      })
    })
  })



  .catch(error => {
    console.error('Error connecting to the database', error);
  });


