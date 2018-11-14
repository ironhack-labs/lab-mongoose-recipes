const mongoose = require('mongoose');
const data = require('./data.js');

const Recipe = require('./models/RecipeSchema.js');

let operation = () => {

  Recipe.collection.drop()
    .then(() =>
      Recipe.create({
        title: 'Recipe 1', level: 'Easy Peasy', ingredients: ['Tomatoe', 'Fish'], cuisine: 'Spanish'
        , dishType: 'Dish', duration: 120, creator: 'Sandra'
      }))
    .then(() => Recipe.insertMany(data))
    .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
    .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
    .then(() => console.log('OK Giorgio'))
    .then(() => {
      mongoose.connection.close();
      console.log('connection close');
    })
    .catch(err => { console.log('An error happened:') })

}

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    operation();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });