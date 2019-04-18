const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

data.forEach(e => {
  Recipe.create(e)
  .then(() => console.log('Criado, mano'))
  .catch(() => console.log('Deu ruim, irmão'));
});
  
Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
.then(() => console.log('Alterado, mano'))
.catch(() => console.log('Deu ruim, irmão'));

Recipe.deleteOne({title: "Carrot Cake"})
.then(() => console.log('Já era, mano'))
.catch(() => console.log('Deu ruim, irmão'));
