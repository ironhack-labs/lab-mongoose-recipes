const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    let Reseta = {title: 'dish', level:'Easy Peasy', cousine: 'stuff'}
    return Recipe.create(Reseta)
    

  })
  .then((newRecepi)=>{console.log (newRecepi)}) 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
