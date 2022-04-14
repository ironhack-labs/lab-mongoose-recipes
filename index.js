const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe
      .create({ title: 'Roasted Chicken', level: 'Amateur Chef', ingredients: ['Chicken', 'Onions', 'Parsley'], cuisine: 'All world', dishType: 'Big one', duration: 2, creator: 'Me' })
      .then(newDish => console.log('El nuevo plato es', newDish.title))

      .then(() => Recipe.insertMany(data))
      .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
      .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
      .then(() => process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          console.log('Mongoose default connection disconnected through app termination')
          process.exit(0)
        })
      }))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
