const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'



const data = require('./data');
const { insertMany } = require('./models/Recipe.model');


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
    //console.log('LOL')
    return Recipe
      .create([{
        title: 'Tortilla',
        level: 'UltraPro Chef',
        ingredients: ['Egg', 'Potatoes'],
        cuisine: 'Spanish',
        dishType: 'breakfast',
        image: 'https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg',
        duration: 35,
        creator: 'Xia & Alberto',
        created: Date.now()
      }])
  })
  .then(() => {
    //console.log('RECETAS')
    Recipe.insertMany(data)
  })
  .then(() => {
    Recipe.findOneAndUpdate({ duration: 100 })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


