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

    // Recipe.create(data[0])
    //   .then(createdRecipe => {
    //     console.log(createdRecipe.title);
    //   });

    Recipe.insertMany(data)
      .then(createdRecipes => {
        const titles = createdRecipes.map(recipe => recipe.title);
        console.log(titles);
      })
      .then(() => {
        return Recipe.findOneAndUpdate({ title: `Rigatoni alla Genovese` }, { duration: 100 }, { new: true });
      })
      .then(({ title, duration }) => {
        console.log(`${title}'s duration was updated to ${duration}.`);
      })
      .then(() => {
        return Recipe.deleteOne({ title: `Carrot Cake` });
      })
      .then(deleteMsg => {
        console.log(deleteMsg);
      })
      .then(() => {
        mongoose.disconnect();
      });

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
