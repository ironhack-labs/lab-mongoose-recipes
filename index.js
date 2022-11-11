const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  // .then(x => {
  //   console.log(`Connected to the database: "${x.connection.name}"`);
  //   // Before adding any recipes to the database, let's remove all existing ones
  // return Recipe.deleteMany()
  // })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//Iteration 2 - Create a recipe

//Recipe.create(data[0]);

//Iteration 3 - Insert multiple recipes

let insertMultiple = Recipe.insertMany(data);
insertMultiple
  .then((arr) => {
    arr.forEach(recipe => console.log(recipe.title));
  })

//Iteration 4 - Update recipe
const filter = { title: 'Rigatoni alla Genovese' };
const update = { duration: '100' };
const opts = { new: true };
Recipe.updateOne(filter, update, opts)
  .then((response) => {
    console.log(response)
  })
  .catch(err => console.log(err))


//Iteration 5 - Remove a recipe
Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => console.log("deleted"))
  .catch(err => console.log(err))

//Iteration 6 - Close connection
mongoose.connection.close();
