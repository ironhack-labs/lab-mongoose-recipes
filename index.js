const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
const connecting = mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create()
  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.updateOne({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  })
  .then(request => {
    console.log('success')
  })
  .catch(err => {
    console.log(err);
  });

Recipe.deleteOne({
    title: 'Carrot Cake'
  })
  .then(request => {
    console.log('successfully deleted');
  })
  .catch(err => {
    console.log(err);
  });

// Recipe.findOneAndUpdate({
//     title: 'Rigatoni alla Genovese'
//   }, {
//     duration: -3
//   }, {
//     new: true,
//     runValidators: true
//   })
//   .then(request => {
//     console.log(request);
//   })
//   .catch(err => {
//     console.log(err);
//   });




mongoose.connection.close(function () {
  console.log('Mongoose default connection closed');
}, 10000);