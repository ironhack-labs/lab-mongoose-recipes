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
  .then( () => {
    Recipe.insertMany(data)
      .then(data => {
        data.forEach(el => {
          console.log('Iteration 2', el.title);
        })
      })
      .then( () => {
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, {useFindAndModify: false})
          .then(recipeUpdate => console.log('The recipe was updated correctly', recipeUpdate.title, '- Duration',  recipeUpdate.duration))
      })
      .then( () => {
        Recipe.findOneAndDelete({ title: 'Carrot Cake' }, {useFindAndModify: false})
          .then(() => {
            Recipe.countDocuments()
            .then(number => console.log('The recipe was removed correctly, now have ', number, 'documents in db')
            )           
          })
      })
  })
  .catch((err) => console.log(err))
})