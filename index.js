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

Recipe.create({title : "Fries",
  level : "Easy",
  ingredients : ["potatoes",'salt','oil','bacon','cheddar'],
  cuisine: "French",
  dishType : "Lunch",
  image : "fries.png",
  duration : 30,
  creator : "John Doe",
  created : Date()});


//Recipe.insertMany(data, function(error, docs) {});

function updateRecipe(id){
  return Recipe.findByIdAndUpdate(id,{duration : 100})
  .then(res =>{
    console.log('duration updated');
  })
  .catch(err =>{
    console.error('err');
  });
}

function removeRecipe(tit){
  return Recipe.deleteMany({title:tit})
  .then(res =>{
    console.log('recipe removed');
  })
  .catch(err =>{
    console.error('err');
  });
}

// updateRecipe("5d66801ce4c64f57588f5348");

removeRecipe("Carrot Cake");

mongoose.connection.close()