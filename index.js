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
    return Recipe.create({
    title: 'Pabellon Criollo',
    level: 'UltraPro Chef',
    ingredients: ['Arroz Blanco', 'Carne para Desmechar', 'Caraotas Negras', 'Platano Maduro Frito'],
    cuisine: 'Venezolana',
    dishType: 'main_course',
    duration: 60,
    creator: 'Desconocido',
  })

}).then(recipe => {
  console.log(`Recipe created: ${recipe.title}`);
})
.catch(error => console.log('Error creating recipe', error))

// 3ra Iteration
.then(() => {return Recipe.insertMany(data)})
.then(recipe => recipe.forEach(element => {
  console.log('Recipe created', element.title)
}))

// Recipe.create(data)
//   .then((docs) => {
//     console.log('The following recipes have been added to the database:');
//     docs.forEach((recipe) => console.log(recipe.title));
//   })
//   .catch((err) => console.error(err))

.catch(error => {
  console.error('Error connecting to the database', error);})

