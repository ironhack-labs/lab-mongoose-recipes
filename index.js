const mongoose = require('mongoose');
const path = require('path')
require(path.join(__dirname, 'config/db.config'))

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require(path.join(__dirname, 'models/Recipe.model'))

// Import of the data from './data.json'
const data = require(path.join(__dirname, 'data'))

// Connection to the database "recipe-app"
Recipe.deleteMany({})
.then( () => {
  Recipe.create(data[1])
  .then(() => {
    console.log('Iteration 1', data[1].title);
  })  
  .catch((err) => console.log(err))
})
Recipe.deleteMany({})
.then( () => {
  Recipe.insertMany(data)
    .then(data => {
      data.forEach(el => {
        console.log('Iteration 2', el.title);
      });
    })
    .catch((err) => console.log(err))
})
