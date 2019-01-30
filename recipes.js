const mongoose = require('mongoose');
const data = require('./data.js');
const recipe = require('./models/recipe.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

let a0 = recipe.create({
  title: 'Gororoba',
  level: 'Mão-de-alface level',
  ingredients: ['miojo', 'feijão', 'resto na geladeira'],
  cuisine: 'Brazilian',
  dishType: 'Fast',
  duration: 5,
  creator: 'Jesus_Negão'
});

let a1 = recipe.insertMany(data)
  .then(() => {
    console.log('You have inserted a ridiculous amount of data in the database');
  }).catch((err) => {
    console.error('Error inserted a ridiculous amount of data in the database', err);
  });

let a2 = recipe.updateOne(
  { title: 'Rigatoni alla Genovese' },
  { duration: 100 })
  .then((upp) => {
    console.log('You have updated ', upp);
  }).catch((err) => {
    console.error('Error on deleting', err);
  });

let b0 = recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
    console.log('You have deleted something');
  }).catch((err) => {
    console.error('Error on deleting', err);
  });

  let c0 = mongoose.connection.close(() => {
    console.log("Mongoose default connection disconnected through app termination")
  };

  // this is not running  
  Promise.all(a0,a1,a2);
  Promise.all(b0);
  Promise.all(c0);
