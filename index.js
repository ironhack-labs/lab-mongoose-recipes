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


  Recipe.create({ title: 'Gâteau', level:"Easy Peasy", cuisine: "French", }, function (err, recipe) {
    if (err) {
        console.log('An error happened:', err);
    } else {
        console.log('The recipe is saved and its value is: ', recipe);
    }
  });
  
  
  Recipe.insertMany(data)
  .then(recipe => { console.log('All the recipes: ', recipe) })
  .catch(err => { console.log('An error happened:', err) });


  Recipe.findByIdAndUpdate( "Rigatoni alla Genovese", { duration: "100" })
  .then(recipe => { console.log('duration:', recipe) })
  .catch(err => { console.log('An error happened:', err) });


  Recipe.deleteOne({ title:"Carrot Cake"})
  .then(recipe => { console.log('Remove carrot cake', recipe) })


 // When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});