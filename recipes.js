const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

const Recipe = require('./models/recipe_schema.js');

const recipeData = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop().then(() => {
      return Recipe.create(
        {
          title: 'Spaguetti',
          cuisine: 'Italian'
        })
        .then(recipe => console.log('New recipe is: ', recipe))
        .then(() => Recipe.insertMany(recipeData))
        .then(() => Recipe.updateOne(
          {
            title: "Rigatoni alla Genovese"
          },
          {
            $set: {
              duration: 100
            }
          }))
        .then(() => Recipe.deleteOne({
          title: "Carrot Cake"
        }))
        .then(() => mongoose.connection.close())
        .then(() => console.log('Mongoose default connection disconnected through app termination'))
    })
      .catch(err => console.log('An error happened:', err));

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });