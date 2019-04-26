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

  Recipe.create({
    title: 'Choco Chip Cookies',
    level:'Easy Peasy',
    ingredients: ['flour','milk','butter','brown sugar','chocolate chips'], 
    cuisine: 'American', 
    dishType: 'Dessert', 
    duration: 45,
    creator: 'Ruth Graves Wakefield'
    }, 
  function(err,recipe){
  if (err){
  console.log('error',err);
  }
  else{
  console.log('The recipe is',recipe);
  }
  });

Recipe.insertMany(data,
  function(err, recipe){
    if (err){
    console.log('error',err);
    }
    else{
    console.log('title',recipe.title);
    }
  }); 


Recipe.updateOne({title:'Rigatoni alla Genovese'}, {duration: 100})
.then(
  function(err) {
    if (err) {
      console.log("The Error is:", err);
    } else {
      console.log("success!");
    }
  });

  Recipe.deleteOne({ title: "Orange and Milk-Braised Pork Carnitas" })
  .then(console.log("Sucess"))
  .catch(console.log("Not Sucess"));

  setTimeout(() => {
    mongoose.disconnect();
  }, 1500)
