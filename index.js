const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { findOneAndUpdate } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

Recipe.create({ title: 'Tortellini carbonara', level: 'Easy Peasy', ingredients: ['onion', 'bacon', 'egg', 'pepper', 'salt', 'pasta'], dishType: 'other', image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/61FCB2B2-DB84-4A68-ABB8-F9FBA800BCA3/Derivates/FCB48A53-86F0-4697-BE75-7B7CE9B49EBE.jpg', duration: 30, cuisine: 'Italian' })
  .then(theNewRecipe => console.log(`Este receta se llama`, theNewRecipe))

  .then(() => {
    console.log('Funciona')
    return Recipe.create(data)
  })


  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(console.log('Update??'))

  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(console.log('delete??'))


  .catch(err => console.log('ERROR DE MONGOOSE ---- ', err))

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})