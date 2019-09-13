const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const mongoose = require('mongoose')
const Recipe = require('./models/Recipe') // Import of the model Recipe from './models/Recipe'
const data = require('./data.js') // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
    console.log('Connected to Mongo!')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

  const myRecipe = 
  { title: 'Tacos al Pastor',
   level: 'Easy Peasy',
    ingredients: ['Pastor', 'Tortilla', 'silantro'], 
    cuisine: 'Mexican', 
    dishType: 'Other', 
    duration: 5, 
    creator: 'guille', 
    created: '30/08/1960' 
  }

let recipeCreated = Recipe.create(newRecipe)
  .then(recipe => {
    console.log(recipe)
  })
  .catch(err => {
    console.log(err)
  })

let recipesCreated = Recipe.create(data)
  .then(recipes => {
    console.log(`Recipe's created ${recipes.length} `)
  })
  .catch(err => {
    console.log(err)
  })
let recipedUpdated = Recipe.findOneAndUpdate(
  {
    title: 'Rigatoni alla Genovese'
  },
  {
    duration: 100
  },
  {
    new: true
  }
)
  .then(recipe => {
    console.log(recipe)
  })
  .catch(err => {
    console.log(err)
  })

let recipeDeleted = Recipe.deleteOne({
  title: 'Carrot Cake'
})
  .then(cake => {
    console.log(`${cake} Not available anymore`)
  })
  .catch(err => {
    console.log(err)
  })