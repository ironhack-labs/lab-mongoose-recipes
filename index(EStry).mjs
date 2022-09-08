import mongoose from 'mongoose';
// const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
// const Recipe = require('./models/Recipe.model');
import Recipe from './models/Recipe.model.js';
// import Recipe from './models/Recipe.model';
// import Recipe from './models/Recipe.model';
// Import of the data from './data.json'
// const data = require('./data.json');
import data from './data.json' assert { type: 'json' };
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// await mongoose.connect('mongodb://localhost:27017/pokemons-v3');
// await mongoose.connection.db.dropDatabase();
// await mongoose.connection.close();

// await mongoose.connect('mongodb://localhost:27017/pokemons-v3');

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
