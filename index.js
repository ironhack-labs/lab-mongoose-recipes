const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');

const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';


mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    let myDish = {title: 'dish', level:'Easy Peasy', cousine: 'universal', dishType: 'breakfast'}
    return Recipe.create(myDish)
  })
  .then((myDish) => {
    console.log (myDish);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
