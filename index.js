const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"


mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe
      .create({ title: "huevos Rotos", level: "Easy Peasy", ingredients: ["huevos", "patatas", "jamón", "aceite"], cuisine: "española", dishType: "main_course", duration: 40, creator: "Fabio" })
    // Run your code here, after you have insured that the connection was made
  })
  .then((recipe) => {
    const prueba = recipe.title
    console.log(prueba)
  })

  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })

  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

process.on('SIGINT', () => {
  mongoose.connection.close()
  console.log('Mongoose default connection disconnected through app termination')
})
