const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { find } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
    .catch(error => {
      console.error('Error connecting to the database', error);
    })
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe
      .create({ title: 'Guacamole', cuisine: 'Mexican' })
      .then(elm => console.log(elm.title))
  })
  .then(() => 
    Recipe
      .create(data)
      .then(elm => elm.forEach(element => console.log(element.title)))
)
  .then(() => 
    Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(elm => console.log("Modificado"))
      .catch(error => {
        console.error('Error 1', error);
      })
    )

  .then(() =>
    Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(elm => console.log("Eliminado!"))
      .catch(error => {
        console.error('Error 2', error);
      })
    )

  .then(() => {
    mongoose.connection.close()
      .then(elm => console.log("Abajo!"))
      .catch(error => {
        console.error('Error 3', error);
      })
  })
  
