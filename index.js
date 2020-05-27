const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 1 - Recipe Schema
    const newRecipe = new Recipe({
      title: 'Crème anglaise',
      level: 'Amateur Chef',
      ingredients: ['milk', 'sugar', 'yolk', 'vanilla'],
      cuisine: 'Enlish',
      dishType: 'dessert',
      duration: 60,
      creator: 'Chef Jules',
    });
    // Iteration 2 - Create a recipe
    Recipe.create(newRecipe)
      .then(recipe => {
        console.log(`New recipe added. Title of the recipe: ${recipe.title}`)
      })
      .then(() => {
        // Iteration 3 - Insert multiple recipes
        Recipe.insertMany(data)
          .then(recipes => {
            console.log(`Recipes imported to the DB. Title of the recipes added:`)
            recipes.forEach(recipe => console.log(`Recipe title ==> ${recipe.title}`))
          })
          .then(() => {
            // Iteration 4 - Update recipe
            Recipe.findOneAndUpdate({
                title: 'Rigatoni alla Genovese'
              }, {
                duration: 100
              })
              .then(amendedRecipe => {
                console.log(`Recipe ${amendedRecipe.title} successfully amended`)
              })
              .then(() => {
                Recipe.deleteOne({
                    title: 'Carrot Cake'
                  })
                  .then(() => {
                    console.log(`Success: The recipe has been removed`)
                    // Iteration 5 - Closing the Database 
                    // DB gets closed once all tasks are completed
                    mongoose.connection.close()
                    mongoose.connection.on('disconnected', () => {
                      console.log('Mongoose default connection disconnected')
                    })
                  })
                  .catch(error => console.log(`Error deleting the recipe. Error message: ${error}`))
              })
              .catch(error => console.log(`Error amending the recipe. Error message: ${error}`))
          })
          .catch(error => console.log(`Error importing recipes from data.js. Error message: ${error}`))
      })
      .catch(error => console.log(`Error creating a new recipe. Error message: ${error}`))
  })
  .catch(error => console.error('Error connecting to the database', error))