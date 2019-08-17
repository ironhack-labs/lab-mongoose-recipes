const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const date = new Date();

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
// const newRecipe = { 
//   title: 'Luan',
//   level: 'Easy Peasy',
//   ingredients: 'eggs',
//   cuisine: '1',
//   dishType: 'Snack',
//   duration: 5,
//   creator: 'Vovo',
// }

// Recipe.create(newRecipe)
//   .then((newRecipe) => {console.log(`Recipe created ${newRecipe}`)})
//   .catch((err) => {
//     console.log('ERROR =>', err);
//   });

  // Recipe.insertMany(data)
  // .then((response) => {
  //   console.log(response)
  // })
  // .catch();

  // Recipe.updateMany({title: 'Rigatoni alla Genovese'}, {duration: '100'})
  //   .then()
  //   .catch();

  // Recipe.deleteMany({title: 'Carrot Cake'})
  //   .then()
  //   .catch();

  mongoose.disconnect()
    .then(() => {
      console.log('Disconnect MongoDB')
    })
    .catch();    
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
