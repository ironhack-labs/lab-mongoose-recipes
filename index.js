const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recipeToAdd = {
  title: 'Ham and cheese sandwich',
  level: 'Easy Peasy',
  ingredients: 'Cheese, ham, and toast bread.',
  cuisine: 'Student meal',
  dishType: 'snack'
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // iteration2
    // Recipe.create(recipeToAdd);
    // console.log(recipeToAdd.title)
    // //iteration 3
    // Recipe.insertMany(data);
    // for (recipe of data) {
    //   console.log(recipe.title);
    // }
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
