const mongoose = require('mongoose');
require("./config/db.config");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');



// Connection to the database "recipe-app"
mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
  .then(() => console.log('Database has been cleared')) 
  .then(() => {
    return Recipe.create(data) //model.create(array de datos)
  })
  .then(result => {
    //console.log(result)
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then(result => { 
    console.log(`The new duration of the "${result.title}" is `,result.duration) 
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' })
  })
  .then(result => {
    console.log(`The "${result.title}" has been eliminated`)
  })

  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close())
})  

Commit prueba