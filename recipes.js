const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
  const recipeSchema = new Schema ({
    title: String ,
    level: String ,
    ingredients: String ,
    cuisune: String ,
    dishType: String ,
    image: String ,
    duration: Number ,
    creator: String ,
    created: Date
  });
  const recipe = mongoose.model('recipe', recipeSchema);

  recipe.create({ title: 'Katchup Pasta' , level: 'Drunk' , ingredients: 'pasta and katchup' , cuisune: 'Poor Berliners' , dishType: 'Pasta' , image: 'unwatchable' , duration: 10 , creator: 'Nir'   });

  recipe.insertMany(data)
  .then(rec => { console.log('The user is saved and its value is: ', rec) })
  .catch(err => { console.log('An error happened:', err) });  