const mongoose = require('mongoose');
const Recipe = require('./models/recipes.models');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const MONGODB_URI = 'mongodb://localhost:27017/recipeApp';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log(`Sucessfully connected to the database ${MONGODB_URI}`))
  .catch(err => console.error(`An error ocurred trying to connect to the database ${MONGODB_URI}`, err));

Recipe.create(data[0])
  .then(recipe => console.log(recipe))
  .catch(error => console.log(error))

Recipe.insertMany([, ...data])
  .then(recipe => console.log(recipe))
  .catch(error => console.log(error))

