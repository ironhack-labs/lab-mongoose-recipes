const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
});

//  Iteration 2 - Create a recipe
// .create() is a mongoose method and under the hood uses insertOne and insertMany
// Recipe.create(data[Math.floor(Math.random() * data.length)])
// .then(recipeData => console.log(`Recipe create worked well: ${recipeData}`))
// .catch(err =>
//   console.log(`Creating a new recipe went wrong! Try again 😞 ${err}`)
// );

//  Iteration 3 - Insert Many recipes
// .create() is a mongoose method and under the hood uses insertOne and insertMany
// Recipe.create(data)
// .then(recipeData => console.log(`Recipe create worked well: ${recipeData}`))
// .catch(err =>
//   console.log(`Creating a new recipe went wrong! Try again 😞 ${err}`)
// );

// Iteration 4 - Update recipe
// Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
//   .then(recipeData => console.log(`Recipe update worked well: ${recipeData}`))
//   .catch(err => console.log(`Updating the recipe went wrong! Try again 😞 ${err}`));

// Iteration 5 - Remove a recipe
// Recipe.deleteOne({ title: 'Carrot Cake' })
//   .then(recipeData => console.log(`Recipe deleted worked well: ${recipeData}`))
//   .catch(err => console.log(`Deleting the recipe went wrong! Try again 😞 ${err}`));

// When the connection is disconnected
mongoose.connection.on('disconnected', () =>
  console.log('Mongoose default connection disconnected')
);

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


