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
    // add a new recipe document to the database:
    Recipe.create({
      title: 'Thai Green Papaya Salad Recipe (ส้มตำ) – Thai Street Food Style!',
      level: 'Easy Peasy',
      ingredients: ['2 cloves of garlic', '5 Thai chillies'],
      cuisine: 'Thai cuisine',
    })
    .then(recipe => console.log(recipe))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
