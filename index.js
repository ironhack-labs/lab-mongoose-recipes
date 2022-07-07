const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();

  })
  .then(x => {
    // add one recipes to the db
    //return Recipe.create(data[0]);
    
    // add all the recipes to the db
    return Recipe.create(data);
  })

  .then (recipe => {
    //console.log(recipe.title);
    console.log("Your request to add one or several new recipes was successful.");
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
  })
  .then (recipy => {
    console.log("Your request to update one or several new recipes was successful.");
    return Recipe.deleteOne({title: "Carrot Cake"});
  })
  .then (x => {
    console.log("Your request to delete one or several new recipes was successful.");
    mongoose.connection.close();
  })
  .then ( x => {
    console.log("Connection to the database has been closed.");
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
