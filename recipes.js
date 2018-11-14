const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

//Importamos nuestro esquema, indicando la ruta
const Recipe = require('./models/RecipeSchema.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.collection.drop()
  

Recipe.create({
  title: 'Recipe 1', level: 'Easy Peasy', ingredients: ['Tomatoe', 'Fish'], cuisine: 'Spanish'
  , dishType: 'Dish', duration: 120, creator: 'Sandra'
})
  .then(() => Recipe.insertMany(data))
  .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(()=> Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(()=> console.log('OK Giorgio'))
  .then(()=> {
    mongoose.connection.close();
    console.log('connection close');
  })
  .catch(err => { console.log('An error happened:') })
