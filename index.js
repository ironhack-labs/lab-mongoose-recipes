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
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  //Iteration 2
  .then(() => {
    Recipe
      .create({ title: 'Tortilla', level: 'Amateur Chef', ingredients: ['onion', 'eggs', 'potatoes', 'salt', 'oil'], cuisine: 'Spanish', dishType: 'main_course', image: "https://images.media-allrecipes.com/images/75131.jpg", duration: 60, creator: 'Carmen', created: 2022 - 04 - 13 })
  })
  //Iteration 3
  .then(() => {
    return Recipe.insertMany(data)
  })
  //Iteration 4
  .then(() => {

    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  // //Iteration 5
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  // //Iteration 6
  .then(() => {
    mongoose.connection.close(() => {
      console.log("Connection closed")
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });