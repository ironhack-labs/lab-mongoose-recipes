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

  Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(recipe => { console.log('success')})
  .catch(err => { console.log('An error happened:', err) });

  Recipe.deleteOne({ title: "Carrot Cake"})
  .then(recipe => { console.log('success')})
  .catch(err => { console.log('An error happened:', err) });

  // Recipe.insertMany(data)
    // .then(recipe => { console.log('The recipe is:', recipe.title) })
    // .catch(err => { console.log('An error happened:', err) });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
 