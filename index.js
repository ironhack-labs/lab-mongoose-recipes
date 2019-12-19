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

// Iteration 2
Recipe.create({
  title: 'Brigadeiro Especial',
  level: 'Easy Peasy',
  ingredients: ['Leite Condensado', 'Chocolate em pó', 'Leite de coco'],
  cuisine: 'Brasileira',
  dishType: 'Dessert',
  duration: 25,
  creator: 'Brigadeiro Luis Antônio',
  created: new Date(1946)}) //isso gera a data 1970-01-01
  .then(recipe => console.log(recipe.title))
  .catch(error => console.log(error));

// Iteration 3
Recipe.insertMany(data)
.then((recipes) => {
  recipes.forEach(recipe => console.log(recipe.title));
  // Iteration 4
  Recipe.updateOne({name: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(() => console.log('Duration updated'))
  .catch(error => console.log(error));
  // Iteration 5
  Recipe.deleteOne({name: 'Carrot Cake'})
  .then(() => {
    console.log('Cake deleted');
    // Iteration 6
    console.log('All tasks done, closing database connection...')
    mongoose.connection.close();
    console.log('Connection closed');
  })
  .catch(error => console.log(error));  
})
.catch(error => console.log(error));