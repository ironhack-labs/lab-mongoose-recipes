const mongoose = require('mongoose');
//const Schema   =  mongoose.Schema({
//const data = require('./data/data.js');



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const Recipe = require('./models/recipe.model');
const recipes = require('./data/data');

require('./config/db.config');

const recipe = {
  title: 'Tarta de yogur',
  level: 'Amateur Chef',
  ingredients: [
    '1 yogur de limón', 
    '1 medida (con el vasito de yogur) de aceite de girasol.', 
    '2 medidas(con el vasito de yogur) de azúcar.', 
    '3 medidas (con el vasito de yogur) de harina.', 
    '3 huevos', 
    '1 sobrecito (16g) de levadura en polvo o polvo de hornear.',  
    'Mantequilla o margarina para engrasar el molde.'],
  cuisine: 'Española',
  dishType: ['Dessert'],
  image: 'https://www.pequerecetas.com/wp-content/uploads/2011/01/Bizcocho-de-yogur.jpg',
  duration: 30,
  creator: 'Chef Marta'
}

Recipe.create(recipe)
  .then((recipe) => {
    console.info('- Created recipe', recipe.title);
    return Recipe.insertMany(recipes);
  })
  .then((recipes) => {
    console.info('Insert many recipes');
    for (let recipe of recipes) {
      console.info('- Created recipe', recipe.tittle)
    }
  })
  .catch(error => console.error ('Ha habido un error', error))