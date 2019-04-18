const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');// Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
// Recipe
Recipe.insertMany(data, function(err,data) {
  if (err) {
    console.log('An error happened:', err);
  } else {
  console.log('The recipe is saved and its value is: ', data);
}
});

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((response) => {
    console.log('update', response);
  })
  .catch((err) => {
    console.log(err);
  });

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.close();
