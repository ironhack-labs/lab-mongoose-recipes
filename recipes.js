const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const Recipe = require('./models/recipe-schema.js');

const recipeData = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');

    Recipe.collection.drop().then(() => {
      Recipe.create({ title: 'Arroz', cuisine: 'Spanish' })
      .then(recipe =>  console.log('The recipe is saved and its value is: ', recipe) )
      .then(() => Recipe.insertMany(recipeData))
      .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 }))
    }).catch(err => { console.log('An error happened:', err) });

    // Recipe.insertMany(recipeData)
    // .then(recipes => { console.log('The recipes are saved and its value are: ', recipes) })
    // .catch(err => { console.log('An error happened:', err) });

    // Recipe.updateOne({ name: "Alice"}, { company: "Ironhack" })
    // .then(recipe => { console.log('The recipes are updated and its value id: ', recipe) })
    // .catch(err => { console.log('An error happened:', err) });

    
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
