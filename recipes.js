const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Recipe = require('./models/Recipe')
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({title: 'Thai rice', cuisine: 'Asian'})
  .then (recipe => { console.log('The ' + recipe.title + ' was created') })
  .catch (err => { console.log('An error happened:', err) });

Recipe.insertMany(data)
  .then (recipe => { console.log('The ' + recipe.title + ' was created') })
  .catch (err => { console.log('An error happened:', err) });

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then (() => {
    console.log('The duration of the Rigatoni alla Genovese was updated')
  })
  .catch (err => { console.log('An error happened:', err) });

Recipe.deleteOne({title: 'Carrot Cake'})
  .then (() => {
    console.log('The Carrot Cake was removed')
  })
  .catch (err => { console.log('An error happened:', err) });

// Close the connection after 2 seconds
setTimeout(() => {
  mongoose.disconnect()
}, 2000)