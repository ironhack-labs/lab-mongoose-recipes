const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(y => {

    return Recipe.create({ title: 'Cookies', level: 'Easy Peasy', ingredientes: ['chocolate', 'sugar', 'flour', 'eggs'], cuisine: 'American', dishType: 'dessert', image: ' ', duration: 20, creator: 'Bernardo' })
    // Run your code here, after you have insured that the connection was made
  })

  .then(i => {
    return Recipe.insertMany(data)
  })

  .then(f => {
    return Recipe.findOneAndUpdate({ name: 'Rigatoni alla Genovese' }, { duration: 100 })
  })

  .then(g => {
    return Recipe.deleteOne({ name: 'Carrot Cake' })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
