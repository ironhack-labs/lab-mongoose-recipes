const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then(mongooseConnect => {
    console.log(`Connected to the database: "${mongooseConnect.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then((borrado) => {
    console.log(borrado)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose
      .disconnect()
      .then(() => {
        console.log('disconnected to the database')
      })
      .catch(error => {
        console.error('Error disconnecting to the database', error)
      })
  })