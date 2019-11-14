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

  //⁄ Recipe.create({title:'trhoa', cuisine:'lol' })
  
  
  Recipe.insertMany(data, { useNewUrlParser: true }
  .then(title => { console.log('The user is saved and its value is: ', title) })
  .catch(err => { console.log('An error happened:', err) })
  )

  Recipe.updateOne("Rigatoni alla Genovese", { duration: 100 });

  Recipe.deleteOne({ title:'Carrot Cake'})
  .then(title => { console.log('The user is deleted ', title) })
  .catch(err => { console.log('An error happened:', err) })