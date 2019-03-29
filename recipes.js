const Recipe = require('./models/recipes.model');
const data = require('./data.js');
const mongoose = require('mongoose');

// Init mongodb connection
require('./configs/db.config');

let receta = {
  title: 'Mojo Picon',
  level: 'Amateur Chef',
  ingredients: ['Cilantro', 'Pimienta Palmera', '30 gr aceite', '1 cucharadita de sal'],
  cuisine: 'Canaria',
  dishType: ['Dish'],
  image: 'https://fotos00.laopinion.es/2014/10/15/646x260/mojo.jpg',
  duration: 10,
  creator: 'Chicote'
  }

Recipe.create(receta)
Recipe.create(data)
  .then (() => {
    return Recipe.updateOne ({title:'Rigatoni alla Genovese'}, {duration:100})
      .then (() => console.info(`Updated :)`))
      .catch (() => console.error(`NOT UPDATED :(`))
  })
  .then (()=> {
    return Recipe.deleteOne ({title: 'Carrot Cake'})
      .then (() => console.info('Succeed deleted!'))
  })
  .then (() => {
    console.info(`Created Recipe: ${receta.title}`);
      return data.forEach (recipe => {
        console.info(`Created Recipe: ${recipe.title}`);
      }) 
  })
  .catch(error => console.error(error))
  .then (() => {
    console.info('Loging Out')
    return mongoose.disconnect()
  })
  .then (() => console.info('-Disconnected-'))









/*mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
*/