const mongoose = require('mongoose');
const Recipes = require('./models/recipes.model');
const recipes = require('./data.js')
const Schema   = mongoose.Schema;
const data = require('./data.js');
console.log('hola')
//de dnd saca esta url?
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  //creo mi recipe
  const recipe = {
    title: 'Salad Fr',
    level: 'UltraPro Chef',
    ingredients: [
      'Cherry tomatoes',
      'northern tuna',
      'lettuce',
      'avocado',
      'peach',
      'pinions',
      'walnuts',
      'fried onion',
      'Salmon'
    ],
    cuisine: 'Spanish',
    dishType: 'Healthy',
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 23,
    creator: 'Srt Efm'
  }
  //pasamos los datos a recipes para crear la nueva
  Recipes.create(recipe)
  .then(() =>{
    console.info('New recipe', recipe.title);
    return Recipes.insertMany(recipes) //la agrego
  })
  .then(() => {
    for (let recipe of recipes) {
      console.info('New recipe', recipe.title);
    }
    return Recipes.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true });
  })
  .then(() => {
    return Recipes.findOneAndRemove({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.info(`${recipe.title} bye bye`);
  })
  .catch(error => console.info(`piiiiiii error: ${error}`))
  .then(() => {
    console.info('closing db');
    return mongoose.connection.close()
  })
  