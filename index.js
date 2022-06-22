const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()

  })



// ITERATION 2
// Recipe
//   .create({ title: 'pesto', level: 'Easy Peasy', cuisine: 'italian', dishType: 'main_course', image: 'https://www.hogarmania.com/archivos/201704/pesto-1280x720x80xX.jpg', direction: 5, duration: 15, creator: 'Rafa', created: '2022-06-21' })
//   .then(Recipe => {
//     console.log(Recipe.title)
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });

// ITERATION 3
// Recipe
//   .create(data)
//   .then(Recipe => {
//     Recipe.forEach(elm => console.log(elm.title))
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });

// ITERATATION 4

// Recipe
//   .updateOne({ duration: 220 }, { duration: 110 })
//   .then(info => console.log(info))
//   .catch(err => console.log('Oh, la cagaste'))

// ITERATION 5
// Recipe
//   .deleteOne({ title: 'Carrot Cake' })
//   .then(info => console.log('Este es un objeto informativo sobre una elimiación', info))
//   .catch(err => console.log('Se produjo un error', err))

// ITERATION 6: Nos dimos cuenta de que podríamos haber anidado todo desde el principio :D... tarde
mongoose.connection.close()