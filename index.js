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

const newObj = {
  title: 'Bolo de Caju',
  level: 'UltraPro Chef',
  ingredients: 'flour, caju, eggs, milk and lucky',
  cuisine: 'North of Brazil',
  dishType: 'Other',
  duration: 2,
  creator: 'Unknown',
};

const promise1 = Recipe.create(newObj)
  .then((e) => console.log(e))
  .catch((error) => console.error('Error', error));

const promise2 = Recipe.insertMany(data)
  .then((e) => console.log(e.title))
  .catch((error) => console.error('Error', error));

const promise3 = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((e) => console.log(e.duration))
  .catch((error) => console.error('Error', error));

const promise4 = Recipe.deleteOne({ title: 'Carrot Cake' })
  .then((e) => console.log(e))
  .catch(() => console.error('ERROR'));

Promise.all([promise1, promise2, promise3, promise4])
  .then((values) => {
    console.log('all recipes was updated');
    console.log(recipeApp);
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
