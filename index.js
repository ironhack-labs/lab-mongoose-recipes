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
    //Iteration 2 - Create a recipe
    Recipe
      .create({
        title: "Soft Boiled Egg",
        level: "UltraPro Chef",
        ingredients: [ "egg1", "egg2"],
        cuisine: "foreign delicacy",
        dishType: "breakfast",
        duration: 10,
        creator: "Mom"
      })
      .then(newRecipe => console.log(newRecipe.title))
      .catch(error => {
        console.error('Error adding to the database', error);
      });
      Recipe
      .create({
        title: "Raw Egg",
        level: "Amateur Chef",
        ingredients: [ "egg", "mouth"],
        cuisine: "french",
        dishType: "drink",
        duration: 0.001,
        creator: "G*d"
      })
    .then(newRecipe => console.log(newRecipe.title))
    .catch(error => {
      console.error('Error adding to the database', error);
    });
    //Iteration 3 - Insert multiple recipes
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  