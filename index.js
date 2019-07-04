const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipe1', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// data.forEach(element => {
//   Recipe.create(element)
//   .then(res => console.log(res.title))
//   .catch(err => console.log(err));
// });

Recipe.insertMany(data)
.then(res => console.log(res))
.catch(err => console.log(err));

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(() => console.log('ok'))
  .catch(err => console.log(err));

Recipe.deleteOne({title: 'Carrot Cake'})
  .then(() => console.log('deleted'))
  .catch(err => console.log(err))

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
  process.exit(0);
});