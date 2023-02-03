const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://127.0.0.1:27017/recipe-app")
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // return Recipe.deleteMany()
    
    // Recipe.create(data[0])
    // .then((createdRecipe) => console.log(createdRecipe))
    // .catch(error => console.error('Error connecting to the database', error));
  
    // Recipe.insertMany([...data])
    // .then((createdRecipes) => console.log(createdRecipes))
    // .catch(error => console.error('Error connecting to the database', error));
    //iteration 4
    
    // Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    //   .then(createdRecipe => console.log(createdRecipe))
    //   .catch(err => console.log(err))

  //iteration 5, remove recipe
  
  // Recipe.deleteOne({title: "Carrot Cake"})
  //   .then(recipe => console.log("deleted"))
  //   .catch(err => console.log(err))

  //iteration 6
})
.finally(() => {
  // Close connection
  mongoose.connection.close()
})


  
  
  
  
  
  
  
