const mongoose = require('mongoose');
mongoose.set("strictQuery", false)

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
  })
  .then(() => {
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    console.log('Success')
  })
  .then(() => {
    Recipe.deleteOne({title: "Carrot Cake"})
    console.log('Success')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
