const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/Recipe');


mongoose.connect('mongodb://localhost/recipeApp')

  .then(() => {
    console.log('Connected to Mongo!')
    Recipe.insertMany(data)
    Recipe.updateOne({duration:100})
    Recipe.findByIdAndRemove("5acf667f85d8ce4815f3fd41")
    mongoose.disconnect()
    .then ((recipes) => {console.log(recipes)})      
    .catch(err => {
    console.error('Error connecting to mongo', err)
  }) });
