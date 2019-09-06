const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// iteration 2
Recipe.create({
  title: "cake",
  level: "easy peasy",
  ingreadients: ['carrot'],
  cuisine: "english",
  dishType: ["Snack"],
  duration: 30,
  creater: 'noriko'
}).then(() => {

  return Recipe.insertMany(data).then(data => {
    data.forEach(recipe => console.log(recipe.title))
  })
}).then(() => {

  return Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    title: "Rigatoni alla Genovese",
    duration: 100
  }).then(() => {
    console.log(`updated succsessfully!`)
  }).catch(err => {
    console.log(err)
  })

}).then(() => {

  return Recipe.deleteOne({
    title: "Carrot Cake"
  }).then(() => {
    console.log('deleted succesfully')
  }).catch(err => {
    console.log(err)
  })

}).then(() => {

  mongoose.connection.close().then(() => {
    console.log('Connection to Mongo closed');
  }).catch(err => {
    console.error('Could not close connection', err);
  })
});