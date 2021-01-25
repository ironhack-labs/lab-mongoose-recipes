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
    //return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    // Iteration 2
    // const recipe1 = data[0];
    // Recipe.create(recipe1)
    //   .then(recipe => console.log(`The ${recipe.title} recipe has been added to the database`, recipe))
    //   .catch(error => console.log('An error happened while saving a new recipe', error));

    // Iteration 3
    // const recipes = data;
    // Recipe.insertMany(recipes)
    //   .then(recipe => console.log(`The ${recipe.title} recipe has been added to the database`))
    //   .catch(error => console.log('An error happened while saving a new recipe', error));

    // Iteration 4
    // Recipe.updateOne({title: "Rigatoni alla Genovese"} , {duration: 100})
    //   .then(recipe => console.log(`The ${recipe.title} recipe was updated correctly!`))
    //   .catch(error => console.log('An error happened while updating the recipe', error));

    // Iteration 5
    // Recipe.deleteOne({title: "Carrot Cake"})
    //   .then(recipe => console.log(`The ${recipe.title} recipe was deleted from the database!`))
    //   .catch(error => console.log('An error happened while deleting the recipe', error));

    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });