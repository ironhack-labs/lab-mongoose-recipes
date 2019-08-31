const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


const exampleRecipe = new Recipe
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.deleteMany({}).then(() => {
  return Recipe.insertMany(data)
})
  .then(() => {

    let updatePromise = Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 });

    let deletePromise = Recipe.deleteOne({ title: "Carrot Cake" })

    return Promise.all([updatePromise, deletePromise])
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch(err => {
    console.log('An error happened:', err)
    mongoose.connection.close()
  });



