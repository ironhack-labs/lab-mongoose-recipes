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
    // Iteration 2 Create a recipe
    createRecipe("Shrimp", "Easy Peasy", ["shrimp", "garlic", "butter"], "Mexican", "main_course")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // Iteration 2 Create a recipe

function createRecipe(title, level, ingredients, cuisine, dishType, image, duration, creator, created) {
  Recipe.create({title, level, ingredients, cuisine, dishType, image, duration, creator, created })
  .then((newRecipe) => console.log(`Recipe title`))
  .catch((err) => console.error(`Error adding recipe`));
}

