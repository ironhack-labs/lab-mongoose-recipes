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
    // return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // Recipe.create({title : 'Barszcz', cuisine: 'Polsih'})
  //   .then(creatRecipe => console.log(creatRecipe.title))
  //   .catch(err => console.log(err))
    
  // Recipe.insertMany(data)
  //    .then()
  //    .catch(err => console.log(err))

  //  Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
  //      .then(udatedRecipe => console.log(udatedRecipe ))
  //      .catch(err => console.log(err))

  //  Recipe.deleteOne({title: 'Carrot Cake'})
  //   .then(deletedRecipe => console.log(deletedRecipe))
  //    .catch(err => console.log(err))

 mongoose.disconnect() 
  //  .then(x => console.log(`Disconnected from the database: "${x.connection.name}"`))
  //  .catch(err => console.log(err))