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

  Recipe.create({
    title: 'second',
    level: 'Easy Peasy',
    ingredients: ['salt', 'whater', 'butterw'],
    cuisine: 'French',
    dishType: 'Breakfast',
    duration: 30,
    creator: 'Arguiñano'
  })

  Recipe.insertMany(data)
  .then( console.log('Created'))
  .catch( err => console.log(err))

  Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, {$set: { duration: 100 }})
  .then(console.log('Updated'))
  .catch(err => console.log(err))

  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(console.log('Done'))
  .catch(err => console.log(err))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

