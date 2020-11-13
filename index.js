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
     return Recipe.create({ 
      title: 'Chilli Con Carne',
      level: 'Easy Peasy',
      ingredients: 'minced beef, onions, garlic, tomatos, kidney beans',
      cuisine: "Mexican",
      dishType: 'main_course',
      duration: 60,
      creator: 'Ania',
      created: ''
    })
      .then(recipe => console.log(`Recipe title is: ${recipe.title}`, recipe))
      .catch(error => console.log('An error happened while saving a new recipe:', error));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
