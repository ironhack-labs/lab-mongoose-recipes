const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    //return Recipe.create(data[0])   **commented to avoid repeted recipe**
    return Recipe.insertMany(data)
  })
  //.then((recipe) => console.log(recipe))    **commented to avoid repeted recipe**
  .then((recipes) => {
    recipes.forEach((r) => console.log(r.title))
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(() => {
    console.log('update done')
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    console.log('erased Carrot Cake')
    mongoose.connection.close()
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
