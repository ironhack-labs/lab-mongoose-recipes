const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { db } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// Iteration 2 console log title
Recipe.find({creator: "Roberto"})
  .then(foundRecipe => {
    for (let i=0; i<foundRecipe.length; i++){
      console.log(foundRecipe[i].title)
    }
  })
  .catch(error => console.log(`Error, ${error}`));

// Iteration 5 - Remove a recipe
Recipe.deleteOne({title: 'Carrot Cake'})
  .then(success => console.log (`Success: ${success}`))
  .catch(error => console.log(`Error: ${error}`))
  
  //Iteration 6 - Close
db.close()
   .then(success => console.log(`Database Closed: ${success}`))
   .catch(error => console.log(`Error: ${error}`))