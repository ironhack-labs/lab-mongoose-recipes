const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
/* require('./data.json') */
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';



mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(data)
  })

  .then(() => {
    return Recipe.create({ title: 'macarrones con tomate', level: 'Easy Peasy', ingredients: ['macarrones', 'tomate'], cuisine: 'italiana', dishType: 'main_course', image: 'https://images.media-allrecipes.com/images/75131.jpg', duration: 30, creator: 'Naomi y Marta' })

  })
  .then((theNewRecipe) => {
    console.log(theNewRecipe.title)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
