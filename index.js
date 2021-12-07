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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const recipe1 = {
      title: "Gobi Coliflower",
      level: "Medium",
      ingredients: ["coliflower", "peas", "potatoes", "curry"],
      cuisine: "Indian",
      dishType: "main_course",
      duration: 60,
      creator: "Monica",
    };
    Recipe.create(recipe1);
    console.log("Iteration 1:", recipe1);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
