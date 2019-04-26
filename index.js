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

  //If node connection closes, close mongoose


//Add individual Recipe
Recipe.create({title: 'Angel Hair Spaghetti',cuisine: 'Italian', })
  .then(recipe=>{
    console.log('The following recipe has been added', recipe)
  }) .catch(err => {
    console.log('The recipe was not added.', err)
  });

//Add all recipes from data.js
Recipe.insertMany(data)
  .then(data => {
    console.log('The following recipes have been added to the DB',data)
  }).catch(err => {
    console.log('The recipes were not added to the DB', err)
  })


  //Find Rigatoni alla Genovese and update
  Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100})
  .then(success => {
    console.log('The following recipe has been updated',success)
  })
  .catch(err => {
    console.log('The recipe was not updated',err)
  })

  //Delete Carrot Cake
  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(suc => {
    console.log('The following recipe has been deleted',suc)
  })
  .catch(err => {
    console.log('The recipe was not deleted', err)
  })

  setTimeout(() => {
    mongoose.disconnect();
  }, 1500) 