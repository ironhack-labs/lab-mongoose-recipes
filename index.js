const mongoose = require('mongoose');

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
    return Recipe.deleteMany()
  })
  .then((data) => 
   {
     console.log(data.title)
     return Recipe.insertMany(data);
   })
   .then(() => {
    return Recipe.create
   })
   .then(() => 
  {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese", duration: 100})
  })
  .then(() => 
  {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  

  
   