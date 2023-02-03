const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({ title: "sweet potatoes whatever" })
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => console.log("recipes were added"))
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, {duration: 100})
    })
  .then(() => console.log("Duration updated"))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake"}))
  .then(() => console.log("carott cake deleted"))
  .catch((error) => {
    console.error("Error connecting to the database", error)
  })
  .finally(() => mongoose.connection.close())

  

 