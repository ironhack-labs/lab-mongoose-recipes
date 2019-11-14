const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// ITERATION 2

let recipe1 = {
  title: 'Pollo al curry',
  level: 'Easy Peasy',
  cuisine: 'Gourmet',
  dishType: 'Breakfast',
  duration: 45,
  creator: 'mitji',
};

// create = insertOne. it returns a Promise, so we have to add .then and .catch
Recipe.create(recipe1)
  .then( recipes => {
    Recipe.find({title: 'Pollo al curry'},{title: 1, _id: 0})
      .then( recipeTitle => console.log('Recipe1 added successfully!', recipeTitle))
      .catch( err => console.log(err));
  })
  .catch( err => console.error(err));
// // ITERATION 3
Recipe.insertMany(data)
  .then( recipes => {
    Recipe.find({},{title: 1, _id: 0})
      .then( recipeTitle => console.log('Recipes added successfully!', recipeTitle))
      .catch( err => console.log(err));
  })
  .catch( err => console.error(err));

// // ITERATION 4

// Update duration
Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 40})
  .then (result => console.log('Recipe updated successfully!', result))
  .catch( err => console.error(err));

// // ITERATION 5
Recipe.deleteOne({title: 'Carrot Cake'})
  .then (result => console.log('Carrot Cake removed successfully:', result))
  .catch( err => console.error(err));


// When successfully connected
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));

// When the connection is over - disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

// If the connection throws an error
mongoose.connection.on('error', err => console.log('Mongoose default connection error: ' + err));

// When the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});