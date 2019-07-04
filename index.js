const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: 'Rice',
  level: 'Easy Peasy',
  ingredients: ['rice', 'salt', 'garlic', 'onion'],
  cuisine: 'Brazilian',
  dishTYpe: 'Other',
  duration: 20,
  creator: 'Gabriela',
}, (err, recipe) => {
  if (err) {
    console.log('An error happened:', err);
  } else {
    console.log('The user is saved and its value is: ', recipe);
  }
});

Recipe.insertMany(data, () => { });

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Succeeeessss Bitch');
  }
});

Recipe.deleteOne({ title: 'Pasta' }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Succeeeessss Bitch');
  }
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
