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
    return Recipe.deleteMany()
  })
  .then(() => {
    const Brigadeiros = new Recipe(
      {
        title: 'Brigadeiros',
        level: 'Easy Peasy',
        ingredients: ['leche condensada', 'colacao', 'mantequilla'],
        cusine: 'Brasilian',
        dishType: 'dessert',
        duration: '20',
        creator: 'Jadde',
      }
    )
    return Recipe.create(Brigadeiros)
  })
  .then(() => {

    const recepies = new Recipe(data)
    return Recipe.create(recepies)

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




