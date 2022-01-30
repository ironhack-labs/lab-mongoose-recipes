const mongoose = require('mongoose');
// Connection to the database "recipe-app"
require('./config/db.config.js');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { prependOnceListener } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.connection.once('open', () => {
mongoose.connection.db.dropDatabase()
  .then(() => console.log('Database has been cleared'))
  .then(() => {
    Recipe.create(data)
    .then(createdRecipes => console.log(`${createdRecipes} has been created`))
    .then(result => {
      return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, { duration: 100 }, { new: true })
    })
    .then(data => {
      console.log(`${data.title} has now ${data.duration}`)
      return Recipe.findOneAndDelete({ title: 'Carrot Cake' })
    })
    .then(deletedTittle => console.log(`${deletedTittle.title} has been deleted`))
  })
  .catch((err) => console.log(err));
});


