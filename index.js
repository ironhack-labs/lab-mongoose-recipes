const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

let testRecipe = {
  name: "Mi Goreng"
};


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app" // connection takes some time / async function
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(testRecipe);
  })
  .then((testRecipeObj) => {     // or when from DB--> testRecipeFromDB
    console.log("our new recipe was successfully saved...testRecipe");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
