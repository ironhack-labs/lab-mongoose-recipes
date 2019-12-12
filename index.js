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

//console.log(data);

  //Iteration 2
  Recipe.create(data[0]).
    then(recipeFromDB => {
    console.log(`The following recipe was created: ${recipeFromDB.title}`);
    }) 
    .catch(err => {
    console.log(`error while creating new recipe: ${err}`);
  }); 
  

  //Iteration 3
  Recipe.insertMany(data).
  then(recipeFromDB => {
  console.log(`The following recipe was created: ${recipeFromDB}`);
  }) 
  .catch(err => {
  console.log(`error while creating new recipe: ${err}`);
  }); 
  

  //Iteration 4
  Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}).
  then(recipeFromDB => {
  console.log(`The following recipe was updated: ${recipeFromDB}`);
  }) 
  .catch(err => {
  console.log(`error while updating recipe: ${err}`);
  }); 
  

  //Iteration 5
  Recipe.findOneAndDelete({title: "Carrot Cake"}).
  then(recipeFromDB => {
  console.log(`The following recipe was deleted: ${recipeFromDB}`);
  }) 
  .catch(err => {
  console.log(`error while deleting recipe: ${err}`);
  }); 
  

  mongoose.connection.close();
  console.log("DB closed");

