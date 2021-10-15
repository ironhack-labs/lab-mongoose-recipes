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
    // Run your code here, after you have insured that the connection was made
    const toast = {
      title: "Toast",
      level: "Easy Peasy",
      ingredients: [
        'bread',
        'cheese',
        'butter'
      ],
      cuisine: 'turkish',
      dishType: 'breakfast',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 5,
      creator: 'zeynep',
      created: '14-10-2021'
    }
    return Recipe.create(toast)
    console.log(`title: ${toast.title}`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
