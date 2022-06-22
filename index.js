const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { create } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({ title: 'Huevos fritos', level: 'Easy Peasy', ingredients: ['Huevos', 'aceite', 'sal'], cuisine: 'allAround', dishType: 'breakfast', duration: 5, creator: 'gallina' })
  })
  .then(() => {
    return Recipe.create(data)
  })
  .then(recipesCreated => {

    recipesCreated.forEach(recipe => {
      console.log(recipe.title)
    })

    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then((updatedRecipe) => {
    console.log('ACTUALIZADA', updatedRecipe)

    return Recipe.deleteOne({ title: "Carrot Cake" })

  })
  .then((deletedRecipe) => {
    console.log('Eliminada', deletedRecipe)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})
