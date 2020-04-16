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
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({ title: 'Tuna Sandwich', cuisine: 'Chef Kevin' })
      .then((newRecipe) => console.log(newRecipe.title))
      .catch((err) => console.log(err))

    Recipe.insertMany(data)
      .then(() => {
        data.forEach((dish) => {
          console.log(dish.title)
        })
        Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(() => {
            console.log('Successfully updated Rigatoni alla Genovese duration')
            Recipe.deleteOne({ title: 'Carrot Cake' })
              .then(() => {
                console.log('Deleted Carrot Cake')
                mongoose.connection.close(() => console.log('Mongoose disconnected'))
              })
              .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
