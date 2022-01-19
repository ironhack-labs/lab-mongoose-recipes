//jshint esversion:8
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
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create({
      title: 'Fejoun a Tina',
      level: 'Easy Peasy',
      ingredients: ['beans', 'peppar', 'salt'],
      cuisine: 'French',
      dishType: 'main_course',
      image: '',
      duration: 45,
      creator: 'Tina Finb',
      created: ''
    })
    .then(receita => console.log(receita.title))
    .catch(err => console.log('Ops! Something went wrong - ',err));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

