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
      "title": "Cold Beetroot Soup",
      "level": "Amateur Chef",
      "ingredients": [
        "1l of Kefir",
        "Jar of marinated beetroot",
        "1 cucumber",
        "A bit of dill",
        "1 spring onion",
      ],
      "cuisine": "Lithuanian",
      "dishType": "main_course",
      "duration": 20,
      "creator": "Chef Daina"
    })
      .then(recipe => {
        console.log(`${recipe.title}`);
    })
      .catch(error => {
        console.log('An error occurred creating a new recipe', error);
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
