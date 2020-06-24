const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

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
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      "title": "Pizza",
      "cuisine": "Italian"
    })
      .then(newRecipe => console.log('La nueva receta creada es:', newRecipe.title))
  })

  .then(() => Recipe.create(data))
  .then(newRecipe => (newRecipe.forEach(recipe => {
    console.log(recipe.title)
  })))
  .then(() =>
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true })
  )
  .then(updatedRecipe => console.log("The recipe ", updatedRecipe.title, "has been updated and the new duration is", updatedRecipe.duration))
  .then(() =>
    Recipe.deleteOne(
      { title: "Carrot Cake" })
  )
  .then(updatedRecipe => console.log("The recipe has been removed."))
  .then(() => mongoose.connection.close(() =>
    console.log('Mongoose default connection disconnected through app termination')))
  .catch(error => {
    console.error('Error connecting to the database', error)
  })