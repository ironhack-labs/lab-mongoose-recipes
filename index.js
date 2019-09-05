const mongoose = require('mongoose')
const Recipe = require('./models/Recipe') // Import of the model Recipe from './models/Recipe'
const data = require('./data.js') // Import of the data from './data.js'

const newRecipe = {
  title: 'Chicken Cake',
  level: 'Easy Peasy',
  ingredients: ['1 Polloyon', '1kg of flour', '5 Carrots'],
  cuisine: 'Homade food',
  dishType: 'Cake',
  image: 'https://images-na.ssl-images-amazon.com/images/I/61imCCyOjCL._SX466_.jpg',
  duration: 60,
  creator: 'Alex Gonzalez'
}

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })
