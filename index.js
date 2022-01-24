const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
require("./config/db.config")
// Import of the data from './data.json'
require("./config/db.config")
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
  .then(() => {
    Recipe.create(data)
  })
  .then((receipes) =>{
    receipes.forEach (everyReceipe => console.log(everyReceipe.title))
    return Recipe.findOneAndUpdate({name: 'Rigatoni alla Genovese'}, {duration: 100},{new: true})
  })
  .then((receipe) => {
    console.log(`${receipe.name}s duration has been successfully changed to ${receipe.duration}.`)
    return Recipe.findOneAndDelete({title:'Carrot Cake'})
  })
  .then((result) => {
    console.log(`Recipe ${result.title} has been deleted`)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close());
