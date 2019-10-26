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

  Recipe.create({ title: 'Apple Pie', cuisine:"American", duration: 20,})
    .then(recipe => { console.log('The recipe is saved and its value is: ', recipe)})
    .catch(err => { console.log('An error happened:', err) })


Recipe.insertMany(data)
  .then(recepies => {
    recepies.forEach(recipe => console.log('The recipe is saved and its value is: ', recipe.title))
    
    return Recipe.updateOne({ tile: 'Rigatoni alla Genovese' }, { duration:100 })
      .then((recipe) => { console.log ('Success!! the recepie has been updated correctly') 
      
    return Recipe.deleteOne({title:'Carrot Cake'})
      .then((recipe)=> { console.log ('You have correctly deleted the recipe') })
    })
  })
  .catch(err => { console.log('An error happened:', err) })
