const mongoose = require('mongoose');
const path = require('path')
require(path.join(__dirname, 'config/db.config'))

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require(path.join(__dirname, 'models/Recipe.model'))

// Import of the data from './data.json'
const data = require(path.join(__dirname, 'data'))
const newRecipe = {
  "title": "Papas with Chorizooo",
  "level": "Amateur Chef",
  "ingredients": [
    "1k papas",
    "1 chorizo dredge",
    "1 lauren leaf"
  ],
  "cuisine": "Spanish",
  "dishType": "starter_dish",
  "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flasrecetasdemicasa.files.wordpress.com%2F2013%2F04%2Fpatatas_con_chorizo.jpg&f=1&nofb=1",
  "duration": 20,
  "creator": "Chef LaAbuela"
}

// Connection to the database "recipe-app"
Recipe.deleteMany({})
.then( () => {
  Recipe.create(newRecipe)
  .then(data => {
    console.log('Iteration 1', data.title);
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
