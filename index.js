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
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Hamburger",
      level: "Amateur Chef",
      ingredients: ['hamburger bread', 'grind meat', 'cucumbers', 'tomatoes', 'fresh onion', 'cheddar cheese', 'bbq salse'],
      cuisine: 'high',
      dishtype: 'main_course',
      image: null,
      duration: 12,
      creator: 'Ronald McDonald',
      created: null
    }).then((recipe) => console.log(recipe.title))
  })
  .then(() => Recipe.insertMany(data))
  .then(dataRec => dataRec.forEach(el => console.log(`${el.title}`)))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
