const mongoose = require('mongoose');

require("./config/db.config")

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
  .then(() => console.log('Database has been cleared'))
  .then(() => Recipe.create(data))
  .then((recipesCreated) => {
    recipesCreated.forEach(recipe => {
      console.log(recipe.title)
    })
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then(result => {
    console.log(`${result.title}'s duration has been updated.`)
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => console.log("Carrot Cake has been deleted."))  
  .catch(error => console.error('Error connecting to the database', error))
  .finally(() => mongoose.connection.close())
  .then(() => console.log("Mongoose disconnected on app termination."))
})


