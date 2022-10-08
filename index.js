const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const myRecipe = require('./myRecipe.json')

const MONGODB_URI = 'mongodb+srv://renatainojosa:ironhack123@cluster0.zslufxg.mongodb.net/recipe-app?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(myRecipe)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(() => {
   return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
