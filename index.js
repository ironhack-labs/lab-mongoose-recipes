const mongoose = require('mongoose')
const Recipe = require('./models/Recipe.model')   // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data')                    // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipe-app'


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())


  // // ## Iteration 3 - Insert multiple recipes
  .then(() => Recipe.create(data))
  .then(() => {
    return Recipe
      .find()
      .select('title')
  })
  .then((recipes) => console.log(recipes))


  // // ## Iteration 4 - Update recipes
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(console.log('----> UPDATE DONE <----'))


  // // ## Iteration 5 - Remove a recipe
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(console.log('----> REMOVAL DONE <----'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })


// // ## Iteration 6 - Close the Database
process.on('SIGINT', () => {
  then.mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})


