const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe
      .create([{ title: 'flan', cuisine: 'francesa' }, { title: 'flon', cuisine: 'francesa' }])
  })
  .then(() => Recipe.insertMany(data))
  .then(() => {
    Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
      .then(updatedRecipe => console.log('Recipe updated: ', updatedRecipe))
  })
  .then(() => {
    Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(deletedRecipe => {
        console.log(`Success! ${deletedRecipe.deletedCount} recipe deleted.`)
        mongoose.disconnect(() => console.log('Disconnected from the database.'))
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error)
  })